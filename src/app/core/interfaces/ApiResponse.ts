export type ApiResponse<ResultType> = {
  data: ResultType;
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};
