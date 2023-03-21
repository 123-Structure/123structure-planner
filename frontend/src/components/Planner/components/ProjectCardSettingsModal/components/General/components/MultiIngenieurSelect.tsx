import { Avatar, Group, MultiSelect, Text } from "@mantine/core";
import { IconCalculator } from "@tabler/icons";
import { forwardRef } from "react";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { useProject } from "../../../../../../../hooks/Project/useProject";
import { useUpdateProject } from "../../../../../../../hooks/Project/useUpdateProject";
import { useRessources } from "../../../../../../../hooks/Ressources/useRessources";
import { companyColor } from "../../../../../../../utils/companyColor";

interface IMultiIngenieurSelectProps {
  project: IProject;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const MultiIngenieurSelect = (props: IMultiIngenieurSelectProps) => {
  const projects = useProject();
  const setProjects = useUpdateProject();
  const ressources = useRessources();

  const handleChangeIngenieur = (newIngenieurId: string[]) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) => project.DOSSIER === props.project.DOSSIER
    );

    const newIngenieur = ressources.filter((ressource) =>
      newIngenieurId.includes(`${ressource.firstName} ${ressource.lastName}`)
    );

    changedProject[0].INGENIEUR = newIngenieur;
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
            <IconCalculator />
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
        <IconCalculator />
        <b>Ingénieur : </b>
      </div>
      <MultiSelect
        data={ressources
          .filter((ressource) => ressource.role.includes("Ingénieur"))
          .map((ingenieur) => `${ingenieur.firstName} ${ingenieur.lastName}`)}
        value={props.project.INGENIEUR.map(
          (ingenieur) => `${ingenieur.firstName} ${ingenieur.lastName}`
        )}
        variant="unstyled"
        placeholder="Ingénieur non défini"
        onChange={(newIngenieurId) => handleChangeIngenieur(newIngenieurId)}
        searchable
        nothingFound="Aucun résultat"
        itemComponent={SelectItem}
        clearable
      />
    </p>
  );
};

export default MultiIngenieurSelect;
