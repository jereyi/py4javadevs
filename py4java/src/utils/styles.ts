import { CSSProperties } from "react";
import { GroupBase, StylesConfig } from "react-select";
import { LanguageOption } from "./types";

export const customStyles= {
    control: (styles: any) => ({
      ...styles,
      width: "100%",
      maxWidth: "14rem",
      minWidth: "12rem",
      borderRadius: "5px",
      color: "#000",
      fontSize: "1rem",
      lineHeight: "1.75rem",
      backgroundColor: "#FFFFFF",
      cursor: "pointer",
      border: "2px solid #000000",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
      ":hover": {
        border: "2px solid #000000",
        boxShadow: "none",
      },
    }),
    option: (styles: any) => {
      return {
        ...styles,
        color: "#000",
        fontSize: "1rem",
        lineHeight: "1.75rem",
        width: "100%",
        background: "#fff",
        ":hover": {
          backgroundColor: "rgb(243 244 246)",
          color: "#000",
          cursor: "pointer",
        },
      };
    },
    menu: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "#fff",
        maxWidth: "14rem",
        border: "2px solid #000000",
        borderRadius: "5px",
        boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
      };
    },
  
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "#000",
        fontSize: "1rem",
        lineHeight: "1.75rem",
      };
    },
  };

  export const customButtonStyle = (moreStyles? : string ) => `border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition duration-200 bg-white flex-shrink-0 ${moreStyles}`;