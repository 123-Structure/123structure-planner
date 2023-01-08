import { FolderColors } from "../data/constants/FolderColors";

export const getMonthColor = (m: string) => {
  for (let i = 0; i < FolderColors.length; i++) {
    const month = FolderColors[i];
    if (m === month.id) {
      return [month.BgColor, month.FontColor];
    }
  }
  return "white";
};
