/***************************************************************************************
 *    Title: CodeRush source code
 *    Author: Arora, Manu
 *    Date: 2023
 *    Code version: 1.0
 *    Availability: https://github.com/manuarora700/react-code-editor
 *
 ***************************************************************************************/
import loader from "@monaco-editor/loader";
import monacoThemes from "monaco-themes/themes/themelist.json";

const map = new Map(Object.entries(monacoThemes));

const defineTheme = (theme: string) => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${map.get(theme) ?? "GitHub Light"}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { defineTheme };
