import React, { useState } from "react";

import EdiText from "react-editext";

export function EditableText(props:any) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("This is a sample text.");

  const handleSave = (value:string) => {
    console.log(value);
    setValue(value);
  };
  return (
    <EdiText
      value={props.children}
      type="text"
      onSave={handleSave}
      editing={editing}
    />
  );
}
