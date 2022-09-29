import { ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

const ManageUsers = () => {
  return (
    <ActionIcon size="xl" variant="filled" color={"yellow"}>
      <IconSettings size={24} color="black" />
    </ActionIcon>
  );
}

export default ManageUsers;