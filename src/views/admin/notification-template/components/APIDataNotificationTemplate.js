import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import DeleteAlertDialog from "components/deleteConfirmationAlert/DeleteAlertDialog";

const APIDataNotificationTemplate = () => {
  // State to keep track of the item being deleted
  const [itemToDelete, setItemToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);

  // Toast popup message
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const toastMessagePopup = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  //fetching the data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_PORTAL_API}/notification`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toastMessagePopup(
        "Data Fetching Error",
        "There was an error while getting the data from Notificatin Template Data Base.",
        statuses[1]
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Text p={10}>Loading...</Text>;
  }
// Delete function (popup confimation and delete)
  const handleDelete = (itemId) => {
    setShowPopup(true);
    setItemToDelete(itemId);
    onOpen();
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete) {
      axios
        .delete(
          `${process.env.REACT_APP_ADMIN_PORTAL_API}/notification/${itemToDelete}`
        )
        .then((response) => {
          console.log("Item deleted successfully.", response.data);
          toastMessagePopup(
            "Successfully Deleted!",
            "Notication Template Deleted Successfully",
            statuses[0]
          );
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          toastMessagePopup(
            "Deletion Failed!",
            "Notication Template Deletion Failed",
            statuses[1]
          );
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
      <TableCaption>Template Data</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Template</Th>
          <Th>View/Edit/Delete</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.type}</Td>
            <Td>{item.template}</Td>
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
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Template</Th>
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

export default APIDataNotificationTemplate;
