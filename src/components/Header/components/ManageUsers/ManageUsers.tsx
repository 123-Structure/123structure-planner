import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import ManageUsersModal from "./components/ManageUsersModal";

const ManageUsers = () => {
  const [openManageUser, setOpenManageUser] = useState(false);

  const handleManageUser = () => {
    setOpenManageUser(true);
  };

  return (
    <>
      <ActionIcon
        size="xl"
        variant="filled"
        color={"yellow"}
        onClick={handleManageUser}
      >
        <IconSettings size={24} color="black" />
      </ActionIcon>
      <ManageUsersModal
        openManageUser={openManageUser}
        setOpenManageUser={setOpenManageUser}
      />
    </>
  );
};

export default ManageUsers;
