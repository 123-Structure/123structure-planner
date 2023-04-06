import {
  IconPencil,
  IconCalculator,
  IconCrown,
  IconBriefcase,
  IconCirclePlus,
  IconChevronUp,
  IconChevronDown,
  IconUpload,
  IconLogout,
  IconCalendarEvent,
  IconHelp,
  IconBulb,
  IconSettings,
  IconFilePlus,
  IconSearch,
  IconAddressBook,
  IconAffiliate,
  IconHome,
  IconMap2,
  IconMail,
  IconPhone,
  IconUser,
  IconAt,
  IconLock,
} from "@tabler/icons-react";
import React from "react";

interface ICustomItemProps {
  logoType: string;
  content: string;
  disableMarginBottom?: boolean;
}

const CustomItem = (props: ICustomItemProps) => {
  const logo = (logoType: string) => {
    switch (logoType) {
      case "pencil":
        return <IconPencil />;
      case "calculator":
        return <IconCalculator />;
      case "crown":
        return <IconCrown />;
      case "briefcase":
        return <IconBriefcase />;
      case "circle-plus":
        return <IconCirclePlus />;
      case "chevron-up":
        return <IconChevronUp />;
      case "chevron-down":
        return <IconChevronDown />;
      case "upload":
        return <IconUpload />;
      case "logout":
        return <IconLogout />;
      case "calendar":
        return <IconCalendarEvent />;
      case "help":
        return <IconHelp />;
      case "idea":
        return <IconBulb />;
      case "settings":
        return <IconSettings />;
      case "file-plus":
        return <IconFilePlus />;
      case "search":
        return <IconSearch />;
      case "address-book":
        return <IconAddressBook />;
      case "affiliate":
        return <IconAffiliate />;
      case "home":
        return <IconHome />;
      case "map":
        return <IconMap2 />;
      case "mail":
        return <IconMail />;
      case "phone":
        return <IconPhone />;
      case "user":
        return <IconUser />;
      case "at":
        return <IconAt />;
      case "lock":
        return <IconLock />;

      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: props.disableMarginBottom ? "8px" : "32px",
      }}
    >
      {/* <img src={logo(props.logoType)} alt="Commercial" /> */}
      <div>{logo(props.logoType)}</div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
};

export default CustomItem;
