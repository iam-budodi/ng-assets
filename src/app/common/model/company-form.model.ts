import { FormControl, FormArray } from "@angular/forms";
import { Address } from "./address.model";

export interface CompanyForm {
  companyAddress: FormControl<Address | null>;
  customerAddresses: FormArray<FormControl<Address | null>>;
}
