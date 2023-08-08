import Card from "components/card/Card";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import DataFetcher from "./DataFetcher";
import CustomUseState from "./CustemUseState";

export default function ViewTemplate(props) {
  const { name, setName, type, setType, template, setTemplate } =
  CustomUseState();

  const [data, setData] = useState();

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  console.log(id)
  console.log(location)

  const {item} = useOutletContext();

  const view = item.find((view) => view.id === id );
  
  if (!view){
    return "*Id didn't match fo template"
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3333/notification");
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.warn("props", props.match.params.id);
  return (
    <Card>
     <h1>Notification Template</h1>
     <div>Name: {view.name}</div>
    </Card>
  );
}
