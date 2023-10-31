// ThemeDropdown.js

import React from "react";
import Select from "react-select";
import { ThemeOption } from "../utils/types";
import { customStyles } from "../utils/styles";

const monacoThemes = require('monaco-themes/themes/themelist');

type SelectChangeFn = (selectedTheme: ThemeOption) => void;


const ThemeDropdown = ({ onSelectChange, theme } : {onSelectChange: SelectChangeFn, theme: ThemeOption}) => {
  return (
    <Select
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      } as ThemeOption))}
      getOptionLabel={(themeOption: ThemeOption) => themeOption.label}
      getOptionValue={(themeOption: ThemeOption) => themeOption.value}
      value={theme}
      styles={customStyles}
      onChange={(selectedOption) => onSelectChange(selectedOption ?? { value: "github-light", label: "Github Light", key: "github-light" } )}
    />
  );
};

export default ThemeDropdown;