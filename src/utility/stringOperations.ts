export const truncate = (str: string, n = 20) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
