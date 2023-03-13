import {
  IconAddressBook,
  IconAffiliate,
  IconCalendarEvent,
  IconHome,
  IconMail,
  IconMap2,
  IconPhone,
  IconSearch,
  IconUser,
} from "@tabler/icons";

export const handleIcon = (type: string) => {
  if (type === "category") {
    return <IconAddressBook size={"1.8rem"} />;
  }

  if (type === "group") {
    return <IconAffiliate size={"1.8rem"} />;
  }

  if (type === "name") {
    return <IconHome size={"1.8rem"} />;
  }

  if (type.includes("location")) {
    return <IconMap2 size={"1.8rem"} />;
  }

  if (type.includes("email")) {
    return <IconMail size={"1.8rem"} />;
  }

  if (type.includes("phone")) {
    return <IconPhone size={"1.8rem"} />;
  }

  if (type.includes("contact") || type.includes("commercial")) {
    return <IconUser size={"1.8rem"} />;
  }

  if (type.includes("appointment")) {
    return <IconCalendarEvent size={"1.8rem"} />;
  }

  return <IconSearch size={"1.8rem"} />;
};
