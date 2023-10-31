export const classnames = (...args: string[]) => {
    return args.join(" ");
  };

export const titleToFileName = (title: string) => {
   return title.split(" ").map(word => word.toLowerCase()).join("-");
};

export const wrappedText = (text: string) => {
  return text.replace(/`(.*?)`/g, "<code>$&</code>").replace(/`/g, "");
};

export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
