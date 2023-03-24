import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import ManageUsersModal from "./components/ManageUsersModal";
import { useUserData } from "../../../../hooks/Auth/useUserData";
import CustomTooltip from "../../../utils/CustomTooltip";

const ManageUsers = () => {
  const [openManageUser, setOpenManageUser] = useState(false);
  const userData = useUserData();

  const handleManageUser = () => {
    setOpenManageUser(true);
  };

  return (
    <>
      <CustomTooltip
        label="Gestion des utilisateurs"
        withArrow={false}
        transition="slide-down"
        delay={500}
      >
        <ActionIcon
          size="xl"
          variant="filled"
          color={"yellow"}
          onClick={handleManageUser}
        >
          <IconSettings size={24} color="black" />
        </ActionIcon>
      </CustomTooltip>
      <ManageUsersModal
        openManageUser={openManageUser}
        setOpenManageUser={setOpenManageUser}
      />
    </>
  );
};

export default ManageUsers;
