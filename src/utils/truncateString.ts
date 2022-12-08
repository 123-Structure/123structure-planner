const truncateString = (str: String) => {
  const maxLength = 22;
  if (str.length > maxLength) {
    return str.substr(0, str.length - (str.length - maxLength)) + "...";
  }
  return str;
};

export default truncateString;
