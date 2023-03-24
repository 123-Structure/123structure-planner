import { Avatar, Group, MultiSelect, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { forwardRef } from "react";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { IRessource } from "../../../../../../../data/interfaces/IRessource";
import { useProject } from "../../../../../../../hooks/Project/useProject";
import { useUpdateProject } from "../../../../../../../hooks/Project/useUpdateProject";
import { useRessources } from "../../../../../../../hooks/Ressources/useRessources";
import { companyColor } from "../../../../../../../utils/companyColor";

interface IMultiDessinateurSelectProps {
  project: IProject;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const MultiDessinateurSelect = (props: IMultiDessinateurSelectProps) => {
  const projects = useProject();
  const setProjects = useUpdateProject();
  const ressources = useRessources();

  const handleChangeDessinateur = (newDessinateurId: string[]) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) => project.DOSSIER === props.project.DOSSIER
    );

    const newDessinateur = ressources.filter((ressource) =>
      newDessinateurId.includes(`${ressource.firstName} ${ressource.lastName}`)
    );

    changedProject[0].DESSINATEUR = newDessinateur;
    setProjects(newProjects);
  };

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar
            className="manageUsersModalAvatar"
            size={22}
            radius={40}
            color={companyColor(
              ressources.filter(
                (ressource) =>
                  `${ressource.firstName} ${ressource.lastName}` === label
              )[0].company
            )}
          >
            <IconPencil />
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
    <p>
      <div className="multiRessourcesSelectTitle">
        <IconPencil />
        <b>Ingénieur : </b>
      </div>
      <MultiSelect
        disabled={
          props.project.ETAT.includes("newEntry") ||
          props.project.ETAT.includes("mustBeAssign")
        }
        data={ressources
          .filter((ressource) => ressource.role.includes("Dessinateur"))
          .map(
            (dessinateur) => `${dessinateur.firstName} ${dessinateur.lastName}`
          )}
        value={props.project.DESSINATEUR.map(
          (dessinateur) => `${dessinateur.firstName} ${dessinateur.lastName}`
        )}
        variant="unstyled"
        placeholder="Dessinateur non défini"
        onChange={(newDessinateurId) =>
          handleChangeDessinateur(newDessinateurId)
        }
        searchable
        nothingFound="Aucun résultat"
        itemComponent={SelectItem}
        clearable
      />
    </p>
  );
};

export default MultiDessinateurSelect;
