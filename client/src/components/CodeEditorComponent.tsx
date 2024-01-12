/***************************************************************************************
*    Title: CodeRush source code
*    Author: Arora, Manu 
*    Date: 2023
*    Code version: 1.0
*    Availability: https://github.com/manuarora700/react-code-editor
*
***************************************************************************************/
import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

type EditorProps = {
    onChange: (action: string, data: string) => void;
    theme: string | undefined;
    language: string | undefined;
  code: string;
  readonly: boolean;
}

const CodeEditorComponenet = (props: EditorProps) => {
  const [value, setValue] = useState("");

  const handleEditorChange = (value?: string) => {
    console.log("handle Change " + value);
    setValue(value || "");
    props.onChange("code", value || "");
  };

  useEffect(()=> {
      setValue(props.code);
  }, [props.language]);

  return (
    <div className="overlay rounded-md w-full h-full bg-black shadow-4xl border-2">
      <Editor
        height="85vh"
        width={`100%`}
        language={props.language || "python"}
        theme={props.theme}
        value={value}
        onChange={handleEditorChange}
        options={{ readOnly: props.readonly }}
      />
    </div>
  );
};
export default CodeEditorComponenet;