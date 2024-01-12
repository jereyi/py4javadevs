/***************************************************************************************
*    Title: CodeRush source code
*    Author: Arora, Manu 
*    Date: 2023
*    Code version: 1.0
*    Availability: https://github.com/manuarora700/react-code-editor
*
***************************************************************************************/
import React from "react";
import Select from "react-select";
import { languageOptions } from "../utils/constants";
import { LanguageOption } from "../utils/types";
import { customStyles } from "../utils/styles";

type SelectChangeFn = {
    onSelectChange : (selectedLanguage: LanguageOption) => void;
}

const LanguagesDropdown = ({ onSelectChange }: SelectChangeFn) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      getOptionLabel={(languageOption: LanguageOption) => languageOption.label}
      getOptionValue={(languageOption: LanguageOption) => languageOption.value}
      defaultValue={languageOptions[0]}
      styles={customStyles}
      onChange={(selectedOption) => onSelectChange(selectedOption ?? languageOptions[0])}
    />
  );
};

export default LanguagesDropdown;