import {LocalDate} from "../service";

export interface Query<T> {
  search: string;
  registration: T; // this is anything of type date
}
