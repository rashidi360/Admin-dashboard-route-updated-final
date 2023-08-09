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
} from "@chakra-ui/react";
// import the custom state which was created separatly.
import CustomUseState from "./CustemUseState";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { Link, Outlet } from "react-router-dom";

const DataFetcher = () => {
  
  // State to keep track of the item being deleted
    const [itemToDelete, setItemToDelete] = useState(null);
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  // const [template, setTemplate] = useState("");
  const { name, setName, type, setType, template, setTemplate } =
    CustomUseState();
  const [data, setData] = useState(null);
  const [uname, usetName] = useState("");
  const [utype, usetType] = useState("");
  const [utemplate, usetTemplate] = useState("");
  const [editId, setEditId] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3333/notification");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleDelete = (itemId) => {
    setShowPopup(true);
    let confirmationMessage = prompt("Please enter 'delete' to confirm delete");
    if (confirmationMessage === "delete") {
      // Make a DELETE request using Axios
      axios
        .delete(`http://localhost:3333/notification/${itemId}`)
        .then((response) => {
          // Handle success, e.g., display a message or update the state
          console.log("Item deleted successfully:", response.data);
          alert("Template deleted");
        })
        .catch((error) => {
          // Handle error, e.g., display an error message
          console.error("Error deleting item:", error);
          alert("Template not deleted");
        });
      // refreshing the page after deleting
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("Template delete failed");
    }
  };

  const handleEdit = (itemId) => {
    axios
      .patch(`http://localhost:3333/notification/${editId}`, {
        id: editId,
        name: uname,
        type: utype,
        template: utemplate,
      })
      .then((res) => {
        console.log(res.data);
        usetName(res.data[0].name);
        usetType(res.data[0].type);
        usetTemplate(res.data[0].template);
      })
      .catch((er) => console.log(er));
    setEditId(itemId);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3333/notification/${editId}`, {
        id: editId,
        name: uname,
        type: utype,
        template: utemplate,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
        setEditId(-1);
      })
      .catch((err) => console.log(err));
  };

    

    const handleDeleteClick = (item) => {
      setItemToDelete(item);
      onOpen(); // Open the delete confirmation dialog
    };
  
    const handleDeleteConfirm = () => {
      if (itemToDelete) {
        handleDelete(itemToDelete._id);
        setItemToDelete(null);
        onClose(); // Close the delete confirmation dialog
      }
    };
  
    const handleDeleteCancel = () => {
      setItemToDelete(null);
      onClose(); // Close the delete confirmation dialog
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
        {data.map((item) =>
          item._id === editId ? (
            <Tr>
              <Td>
                <input
                  type="text"
                  value={uname}
                  onChange={({ target }) => usetName(target?.value)}
                />
              </Td>
              <Td>
                <input
                  type="text"
                  value={utype}
                  onChange={({ target }) => usetType(target?.value)}
                />
              </Td>
              <Td>
                <input
                  type="text"
                  value={utemplate}
                  onChange={({ target }) => usetTemplate(target?.value)}
                />
              </Td>
              <Td>
                <Button onClick={handleUpdate}>Update</Button>
              </Td>
            </Tr>
          ) : (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.type}</Td>
              <Td>{item.template}</Td>
              <Td>
                <Flex>
                  <Button onClick={() => handleDelete(item._id)}>
                    <DeleteAlertDialog />
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
          )
        )}
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
      {/* <DeleteAlertDialog
        isOpen={isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      /> */}
    </Table>

    /* <Box bg={"tomato"} borderRadius={3} m={5} p={2}>
        {data.map((item) => (
          <div key={item.id}>
            <Card bg={"lightblue"} m={1} p={2}>
              <Flex justify={"space-between"}>
                <Button>
                  <ViewIcon />
                </Button>
                <Button>
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </Flex>
              <p>Name: {item.name}</p>
              <p>Type: {item.type}</p>
              <p>Template: {item.template}</p>
              {/* Render other data properties as needed */
    /* </Card>
          </div>
        ))}
      </Box> */
  );
};

export default DataFetcher;
