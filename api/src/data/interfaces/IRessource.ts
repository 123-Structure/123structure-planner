export interface IRessource {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: [string];
  company: string;
  fixer?: string[] | undefined;
}
