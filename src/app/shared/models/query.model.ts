export interface Query<T> {
  search?: string;
  startDate: T; // this is anything of type date
  endDate?: T;
}
