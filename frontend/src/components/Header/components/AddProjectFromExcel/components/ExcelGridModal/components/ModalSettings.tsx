import { Checkbox, ActionIcon, Modal } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { ProjectParameters } from "../../../../../../../data/constants/ProjectParameters";
import CustomTitle from "../../../../../../utils/CustomTitle";

interface IExcelDataGridSettingsProps {
  showParams: string[];
  setShowParams: Dispatch<SetStateAction<string[]>>;
}

const ModalSettings = (props: IExcelDataGridSettingsProps) => {
  const [openSettings, setOpenSettings] = useState(false);

  const handleSettingsClick = () => {
    setOpenSettings(true);
  };

  return (
    <>
      <Modal
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openSettings}
        onClose={() => setOpenSettings(false)}
        padding={"xl"}
        title={
          <CustomTitle
            icon={<IconSettings size={24} />}
            title="Paramètre du tableau"
          />
        }
      >
        <Checkbox.Group
          orientation="vertical"
          label="Afficher / Masquer des colonnes"
          description="Décocher pour masquer la colonne"
          value={props.showParams}
          onChange={props.setShowParams}
        >
          {ProjectParameters.map((param, index) => (
            <Checkbox key={index} checked={true} value={param} label={param} />
          ))}
        </Checkbox.Group>
      </Modal>
      <ActionIcon
        size="xl"
        variant="filled"
        color={"yellow"}
        onClick={handleSettingsClick}
      >
        <IconSettings size={24} color="black" />
      </ActionIcon>
    </>
  );
};

export default ModalSettings;
