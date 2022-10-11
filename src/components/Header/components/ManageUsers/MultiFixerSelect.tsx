import { Avatar, Group, MultiSelect, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { forwardRef } from "react";
import {
  useRessources,
  useUpdateRessources,
} from "../../../../context/RessourceContext";
import { IRessource } from "../../../../data/interfaces/IRessource";
import { companyColor } from "../../../../utils/companyColor";

interface IMultiFixerSelectProps {
  user: IRessource;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const MultiFixerSelect = (props: IMultiFixerSelectProps) => {
  const ressources = useRessources();
  const setRessources = useUpdateRessources();

  const fixerData = ressources
    .filter((ressource) => ressource.role.includes("Correcteur"))
    .map((ressource) => `${ressource.firstName} ${ressource.lastName}`);

  const handleChangeFixer = (newFixer: string[] | null, user: IRessource) => {
    const newRessources = [...ressources];

    const changedUser = newRessources.filter(
      (ressource) =>
        ressource.firstName === user.firstName &&
        ressource.lastName === user.lastName &&
        ressource.company === user.company &&
        ressource.role === user.role
    );

    const newFixerList: IRessource[] = [];

    newFixer?.forEach((fixerName) => {
      newRessources?.forEach((ressource) => {
        if (`${ressource.firstName} ${ressource.lastName}` === fixerName) {
          newFixerList.push(ressource);
        }
      });
    });

    console.log(newFixerList, changedUser[0]);

    changedUser[0].fixer = newFixerList;

    setRessources(newRessources);
  };

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar
            size={22}
            radius={40}
            style={{ marginBottom: "6px" }}
            color={companyColor(
              ressources.filter(
                (ressource) =>
                  `${ressource.firstName} ${ressource.lastName}` === label
              )[0].company
            )}
          >
            <IconStar />
          </Avatar>

          <div>
            <Text
              color={companyColor(
                ressources.filter(
                  (ressource) =>
                    `${ressource.firstName} ${ressource.lastName}` === label
                )[0].company
              )}
            >
              {label}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <MultiSelect
      data={fixerData}
      value={
        props.user.fixer?.map((f) => `${f.firstName} ${f.lastName}`) as string[]
      }
      variant="unstyled"
      placeholder="Correcteur non défini"
      onChange={(newFixer) => handleChangeFixer(newFixer, props.user)}
      searchable
      nothingFound="Aucun résultat"
      itemComponent={SelectItem}
    />
  );
};

export default MultiFixerSelect;
