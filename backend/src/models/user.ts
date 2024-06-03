export interface Pagination {
  totalUser: number;
  totalPages: number;
  currentPage: string | number | string[];
  parsedPageSize: number;
}
