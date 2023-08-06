import React from "react";
import { useState } from "react";

export default function CustomUseState() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [template, setTemplate] = useState("");
  return { name, setName, type, setType, template, setTemplate };
}
