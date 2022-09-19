import { Input, Modal } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
}

const MoreInfoModal = (props: IProjectCardProps) => {
  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showMoreInfo}
      onClose={() => props.setShowMoreInfo(false)}
      size="lg"
    >
      <p>
        <b>N° 123 : </b>22.07.449L
      </p>
      <div
        className="sst"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <b>N° SST : </b>
        <Input placeholder="00.00.000A" style={{ width: "25%" }}></Input>
      </div>
      <p>
        <b>Nom : </b>Propriété Mme GUYON (Clavier Giraud)
      </p>
      <p>
        <b>Client : </b>BigMat
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <b>H ING : </b>
        <input style={{ width: "10%" }} type="number" name="H ING" id="h_ing" />
        <b>H DES : </b>
        <input style={{ width: "10%" }} type="number" name="H DES" id="h_des" />
        <b>RENDU : </b>
        <input type="date" name="" id="" />
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
