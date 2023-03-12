import { Address } from "./address.model";

export interface Company {
  companyAddress: Address;
  customerAddresses: Address[];
}
