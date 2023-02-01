import { Card } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconCalendarTime,
  IconCash,
  IconCashOff,
  IconCreditCard,
} from "@tabler/icons";
import React, { useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { TPaymentType } from "../../../../../data/types/TPaymentType";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "./CustomerItem";

interface ICustomerPaymentProps {
  customer: ICustomer;
}

const CustomerPayment = (props: ICustomerPaymentProps) => {
  const [editCustomerPayment, setEditCustomerPayment] = useState(false);
  const [paymentDeadline, setPaymentDeadline] = useState(
    props.customer.paymentDeadline
  );
  const [paymentType, setPaymentType] = useState<TPaymentType>(
    props.customer.paymentType
  );
  const [paymentStatus, setPaymentStatus] = useState(
    props.customer.paymentStatus
  );

  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const selectLabel = (
    editMode: boolean,
    currentValue: string | undefined,
    label: string[],
    defaultValue: string[]
  ) => {
    if (editMode) {
      return label.reduce((acc, l) => {
        l === currentValue ? acc.push(l + "*") : acc.push(l);
        return acc;
      }, [] as string[]);
    } else {
      return defaultValue;
    }
  };

  const handleValideClick = () => {
    const newCustomer = [...customers];
    const changedCustomer = newCustomer.filter(
      (customer) =>
        customer.category === props.customer.category &&
        customer.group === props.customer.group &&
        customer.name === props.customer.name
    );

    changedCustomer[0].paymentDeadline = paymentDeadline;
    changedCustomer[0].paymentType = paymentType;
    changedCustomer[0].paymentStatus = paymentStatus;

    setCustomers(newCustomer);
    showNotification({
      title: `✅ Fiche client sauvegardé`,
      message: `La fiche client ${props.customer.name} est mise à jour`,
      color: "green",
    });
    setEditCustomerPayment(false);
  };

  const handleCancelClick = () => {
    setPaymentDeadline(props.customer.paymentDeadline);
    setPaymentType(props.customer.paymentType);
    setPaymentStatus(props.customer.paymentStatus)

    showNotification({
      title: `⛔ Fiche client non sauvegardé`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerPayment(false);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="customerPayment">
      <div className="customerIdentityTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconCalendarTime size={24} />}
          title="Comptabilité"
        />
        <EditModeToggle
          disabled={false}
          editMode={editCustomerPayment}
          editLabel=""
          validateLabel=""
          cancelLabel=""
          handleEditClick={() => setEditCustomerPayment(true)}
          handleValideClick={handleValideClick}
          handleCancelClick={handleCancelClick}
        />
      </div>
      <div className="customerItemContainer">
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            inputType="select"
            label={selectLabel(
              editCustomerPayment,
              paymentDeadline,
              ["30", "45"],
              ["Délai de paiement :"]
            )}
            updateLabel={[setPaymentDeadline]}
            icon={<IconCalendarTime size={24} color="black" />}
            color="yellow"
          />
          <p>{editCustomerPayment ? "jour(s)" : paymentDeadline}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            inputType={"select"}
            label={selectLabel(
              editCustomerPayment,
              paymentType,
              [
                "Chèque",
                "Virement",
                "Lettre de change relevé (LCR)",
                "Contrat cadre",
              ],
              ["Mode de paiement :"]
            )}
            updateLabel={[setPaymentType]}
            icon={<IconCreditCard size={24} color="black" />}
            color="yellow"
          />
          <p>{editCustomerPayment ? "" : paymentType}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            inputType={"select"}
            label={selectLabel(
              editCustomerPayment,
              paymentStatus,
              ["A", "B", "C"],
              ["Statut de paiement :"]
            )}
            updateLabel={[setPaymentStatus]}
            icon={
              paymentStatus === "C" ? (
                <IconCashOff size={24} color="black" />
              ) : (
                <IconCash size={24} color="black" />
              )
            }
            color={
              paymentStatus === "A"
                ? "green"
                : paymentStatus === "B"
                ? "orange"
                : "red"
            }
          />
          <p>{editCustomerPayment ? "" : paymentStatus}</p>
        </div>
      </div>
    </Card>
  );
};

export default CustomerPayment;
