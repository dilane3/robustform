export const truncate = (str: string, n = 20) => {
  return str.length > n ? str.substring(0, n - 1) + "..." : str;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 

// export const generateUID = () => {
//   return uuid.v4() as string;
// };