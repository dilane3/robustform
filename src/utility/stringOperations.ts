export const truncate = (str: string, n = 20) => {
  return str.length > n ? str.substring(0, n - 1) + "..." : str;
};

export const firstLetterToUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 
