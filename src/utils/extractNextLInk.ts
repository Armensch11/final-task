export const extractNextLink = (headerReturn: string) => {
  if (headerReturn.length === 0) {
    return null;
  }
  const start = headerReturn.indexOf("<");
  const end = headerReturn.indexOf(">");
  return headerReturn.substring(start + 1, end);
};
