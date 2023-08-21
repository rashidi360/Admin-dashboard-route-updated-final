import { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
// import the custom component which was created separatly.
import DeleteAlertDialog from "components/deleteConfirmationAlert/DeleteAlertDialog";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const APIDataRates = () => {
  // State to keep track of the item being deleted
  const [itemToDelete, setItemToDelete] = useState(null);

  const [data, setData] = useState([]);
  const [counsellorData, setCounsellorData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3333/counselor/rate");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataCounsellor = async () => {
    try {
      const response = await axios.get("http://localhost:3333/counselor");
      setCounsellorData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataCounsellor();
  }, []);
  // console.log("data", data);
  // console.log("counsellorData", counsellorData);

  if (!data) {
    return <Text p={10}>Loading...</Text>;
  }

  const handleDelete = (itemId) => {
    setItemToDelete(itemId);
    onOpen();
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete) {
      axios
        .delete(`http://localhost:3333/counselor/rate/${itemToDelete}`)
        .then((response) => {
          console.log("Item deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        })
        .finally(() => {
          setItemToDelete(null);
          onClose();
          fetchData(); // Fetch data again to update the list after deletion
        });
    }
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    onClose();
  };
  // Merge two api datas togather
  const mergeDataFn = (data, counsellorData) => {
    let res = [];
    res = data.map(obj => {
      const index = counsellorData.findIndex(el => el["_id"] === obj["counselor"]);
      const { displayName } = index !== -1 ? counsellorData[index] : {};
      return {
         ...obj,
         displayName
      };
    })
    return res;
};
// console.log("mergeData(data, counsellorData)(data, counsellorData)",mergeDataFn(data, counsellorData));
  
  const mergedData = mergeDataFn(data, counsellorData);
  
  return (
    <Table variant="simple">
      <TableCaption>Counsellor Rate Data</TableCaption>
      <Thead>
        <Tr>
          <Th>Counsellor Name</Th>
          <Th>Hour From</Th>
          <Th>Hour To</Th>
          <Th>Rate</Th>
          <Th>Country</Th>
          <Th>Currency</Th>
          <Th>View/Edit/Delete</Th>
        </Tr>
      </Thead>

      <Tbody>
        {mergedData.map((item) => (
          <Tr key={item._id}>
            <Td>{item.displayName}</Td>
            <Td>{item.hourFrom}</Td>
            <Td>{item.hourTo}</Td>
            <Td><CurrencyFormat value={item.rate} thousandSeparator suffix=".00" /> </Td>
            <Td>{item.country}</Td>
            <Td>{item.currency}</Td>
            <Td>
              <Flex>
                <Button onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </Button>
                <Link to={`view-template/${item._id}`}>
                  <Button>
                    <ViewIcon />
                  </Button>
                </Link>
                <Link to={`update-form/${item._id}`}>
                  <Button>
                    <EditIcon />
                  </Button>
                </Link>
              </Flex>
              {/* <Outlet context={{ item }} /> */}
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Counsellor Name</Th>
          <Th>Hour From</Th>
          <Th>Hour To</Th>
          <Th>Rate</Th>
          <Th>Country</Th>
          <Th>Currency</Th>
          <Th>View/Edit/Delete</Th>
        </Tr>
      </Tfoot>
      {/* Delete Confirmation Dialog */}
      <DeleteAlertDialog
        isOpen={isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirmed}
      />
    </Table>
  );
};

export default APIDataRates;
