export const HandleUploadFile = (
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setBinary: React.Dispatch<React.SetStateAction<string>>
) => {
  setFile(file);
  if (file !== null) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      if (base64String !== null) {
        setBinary(base64String);
      }
    };
  }
};
