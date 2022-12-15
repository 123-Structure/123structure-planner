export const companyColor = (company: string | undefined) => {
  if (company !== undefined) {
    switch (company) {
      case "Clisson":
        return "yellow";
        break;
      case "Anglet":
        return "violet";
        break;
      case "Villefranche-sur-Saône":
        return "red";
        break;
      case "Global":
        return "green";
        break;

      default:
        return "dark";
        break;
    }
  } else {
    return "dark";
  }
};
