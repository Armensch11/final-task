export const extractNextLink = (header: string | null): string | null => {
  if (header?.length === 0) {
    return null;
  }
  const start = header?.indexOf("<");
  const end = header?.indexOf(">");
  if (header) {
    const link =
      typeof start === "number" && end
        ? header.substring(start + 1, end)
        : null;

    return link;
  }
  return null;
};
