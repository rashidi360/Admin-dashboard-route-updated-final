import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Button, useToast } from "@chakra-ui/react";
import Card from "components/card/Card";
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
// import the custom state which was created separatly.
import DeleteAlertDialog from "components/deleteConfirmationAlert/DeleteAlertDialog";
import { Link, Outlet } from "react-router-dom";

const APIData = () => {
  // State to keep track of the item being deleted
  const [itemToDelete, setItemToDelete] = useState(null);
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  // const [template, setTemplate] = useState("");
  
  const [data, setData] = useState(null);
  const [uname, usetName] = useState("");
  const [utype, usetType] = useState("");
  const [utemplate, usetTemplate] = useState("");
  const [editId, setEditId] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPopup, setShowPopup] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3333/coupon");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Text p={10} >Loading...</Text>;
  }

  const handleDelete = (itemId) => {
    setShowPopup(true);
    setItemToDelete(itemId);
    onOpen();
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete) {
      axios
        .delete(`http://localhost:3333/coupon/${itemToDelete}`)
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


  return (
    <Table variant="simple">
      <TableCaption>Coupon Data</TableCaption>
      <Thead>
        <Tr>
          <Th>Coupon Code</Th>
          <Th>Discount Type</Th>
          <Th>Discount Amount</Th>
          <Th>Maximum Discount</Th>
          <Th>Valid Through</Th>
          <Th>Used On</Th>
          <Th>View/Edit/Delete</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.discountType}</Td>
            <Td>{item.amount}</Td>
            <Td>{item.maxDiscount}</Td>
            <Td>{item.validThrough}</Td>
            <Td>{item.usedOn}</Td>
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
                  <Button
                  // onClick={() => handleEdit(item._id)}
                  >
                    <EditIcon />
                  </Button>
                </Link>
              </Flex>
              <Outlet context={{ item }} />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
        <Th>Coupon Code</Th>
          <Th>Discount Type</Th>
          <Th>Discount Amount</Th>
          <Th>Maximum Discount</Th>
          <Th>Valid Through</Th>
          <Th>Used On</Th>
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

export default APIData;
