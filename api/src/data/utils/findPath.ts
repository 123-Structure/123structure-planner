export function findPath(
  obj: any,
  searchTerm: string,
  type: string,
  currentPath: string = "",
  results: string[] = []
) {
  for (let key in obj) {
    const value = obj[key];
    const path = currentPath ? `${currentPath}.${key}` : key;

    const excludesKey: string[] = ["logo", "priceList"];

    // Check if the key contains the search term
    if (
      key.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !excludesKey.includes(key)
    ) {
      results.push(path);
    }

    // Check if the value contains the search term
    if (
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !excludesKey.includes(key)
    ) {
      results.push(path + ": " + value);
    } else if (typeof value === "object" && value !== null) {
      findPath(value, searchTerm, type, path, results);
    }
  }

  return {
    id: obj._id,
    type,
    searchTerm,
    results,
    score: obj.score,
  };
}
