export interface IRessource {
  _id: string;
  firstName: string;
  lastName: string;
  role: [string];
  company: string;
  fixer?: IRessource[] | undefined;
}
