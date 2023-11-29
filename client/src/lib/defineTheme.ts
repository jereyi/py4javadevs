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