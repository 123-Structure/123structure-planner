export const isCPFormat = (cp: string) => {
  const pattern = /^\d{5}$/;
  return pattern.test(cp);
};

export const isEmailFormat = (email: string) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const isPhoneFormat = (phone: string) => {
  const pattern =
    /^(\+\d{2}[ .-]\d{2}[ .-]\d{2}[ .-]\d{2}[ .-]\d{2}|\d{2}[ .-]\d{2}[ .-]\d{2}[ .-]\d{2}[ .-]\d{2}|\+\d{11}|\d{10})$/;
  return pattern.test(phone);
};
