export type Params = {
  page: number;
  limit?: number;
};

export type SearchParams = {
  search: string;
} & Params;
