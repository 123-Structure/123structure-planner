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
        return "/img/illustration/pencil.svg";
      case "calculator":
        return "/img/illustration/calculator.svg";
      case "crown":
        return "/img/illustration/crown.svg";
      case "briefcase":
        return "/img/illustration/briefcase.svg";
      case "circle-plus":
        return "/img/illustration/circle-plus.svg";
      case "chevron-up":
        return "/img/illustration/chevron-up.svg";
      case "chevron-down":
        return "/img/illustration/chevron-down.svg";
      case "upload":
        return "/img/illustration/upload.svg";
      case "logout":
        return "/img/illustration/logout.svg";
      case "calendar":
        return "/img/illustration/calendar.svg";
      case "help":
        return "/img/illustration/help.svg";
      case "idea":
        return "/img/illustration/idea.svg";
      case "settings":
        return "/img/illustration/settings.svg";
      case "file-plus":
        return "/img/illustration/file-plus.svg";
      case "search":
        return "/img/illustration/search.svg";
      case "address-book":
        return "/img/illustration/address-book.svg";
      case "affiliate":
        return "/img/illustration/affiliate.svg";
      case "home":
        return "/img/illustration/home.svg";
      case "map":
        return "/img/illustration/map.svg";
      case "mail":
        return "/img/illustration/mail.svg";
      case "phone":
        return "/img/illustration/phone.svg";
      case "user":
        return "/img/illustration/user.svg";
      case "at":
        return "/img/illustration/at.svg";
      case "lock":
        return "/img/illustration/lock.svg";

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
      <img src={logo(props.logoType)} alt="Commercial" />
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
};

export default CustomItem;
