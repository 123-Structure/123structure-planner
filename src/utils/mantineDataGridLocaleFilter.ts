import {
  createStringFilter,
  createNumberFilter,
  createBooleanFilter,
} from "mantine-data-grid";

export const stringFilter = createStringFilter({
  labels: {
    in: "Contient",
    nin: "Ne contient pas",
    eq: "Est égal à",
    neq: "N'est pas égale à",
    start: "Commence avec",
    end: "Fini avec",
  },
  placeholder: "Saisie un texte",
});

export const numberFilter = createNumberFilter({
  labels: {
    eq: "Est égal à",
    neq: "N'est pas égale à",
    gt: "Plus grand que",
    gte: "Plus grand que ou égal à",
    lt: "Plus petit que",
    lte: "Plus petit que ou égal à",
  },
  placeholder: "Saisir un nombre",
});

export const booleanFilter = createBooleanFilter({
  trueLabel:"Oui",
  falseLabel:"Non",
  variant:"segmented"
})