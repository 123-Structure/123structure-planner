export interface ISearchDataFromAPI {
  id: string;
  type: string;
  searchTerm: string;
  results: string[];
  score: number;
}
