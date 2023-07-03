import {EMPLOYEE_TABLE_COLUMNS} from "../../employee/model/employee-table-column.config";
import {AUDIT_TABLE_COLUMNS} from "../../shared/util/audit-table";
import {COMPUTER_TABLE_COLUMNS} from "../../inventory/computer/model/computer-table.config";
import {ITableColumn} from "../../shared/models/table-column.model";
import {ASSIGNMENT_TABLE_COLUMNS} from "../../allocation/assign/model/assign-table.config";
import {TRANSFER_TABLE_COLUMNS} from "../../allocation/transfer/model/transfer-table";

const [
  registeredBy,
  registeredAt,
  updatedBy,
  updatedAt
] = AUDIT_TABLE_COLUMNS.map((column: ITableColumn) => column.name);


export const employeeExcelHeader = () => {
  const [
    sn,
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    age,
    email,
    mobile,
    workId,
    hireDate,
    status,
    timeOfService,
    departmentName,
    addressStreet,
    addressWard,
    addressDistrict
  ] = EMPLOYEE_TABLE_COLUMNS.map((column: ITableColumn) => column.name);

  return {
    A: sn,
    B: firstName,
    C: middleName,
    D: lastName,
    E: gender,
    F: dateOfBirth,
    G: age,
    H: email,
    I: mobile,
    J: workId,
    K: hireDate,
    L: status,
    M: timeOfService,
    N: departmentName,
    O: addressStreet,
    P: addressWard,
    Q: addressDistrict,
    R: registeredBy,
    S: registeredAt,
    T: updatedBy,
    U: updatedAt
  }
}

export const computerExcelHeader = () => {
  const [
    sn,
    brand,
    model,
    modelNumber,
    serialNumber,
    manufacturer,
    processor,
    memory,
    storage,
    displaySize,
    peripherals,
    categoryName,
    purchaseDate,
    purchaseInvoice,
    operatingSystem
  ] = COMPUTER_TABLE_COLUMNS.map((column: ITableColumn) => column.name);

  return {
    A: sn,
    B: brand,
    C: model,
    D: modelNumber,
    E: serialNumber,
    F: manufacturer,
    G: processor,
    H: memory,
    I: storage,
    J: displaySize,
    K: peripherals,
    L: categoryName,
    M: purchaseDate,
    N: purchaseInvoice,
    O: operatingSystem,
    P: registeredBy,
    Q: registeredAt,
    R: updatedBy,
    S: updatedAt
  }
}

export const allocationExcelHeader = () => {
  const [
    sn,
    brand,
    model,
    serialNumber,
    employeeFirstname,
    employeeLastname,
    employeeWorkId,
    employeeEmail,
    employeeMobile,
    employeeDept,
    allocationDate,
    allocationStatus,
    remarks,
  ] = ASSIGNMENT_TABLE_COLUMNS.map((column: ITableColumn) => column.name);

  return {
    A: sn,
    B: brand,
    C: model,
    D: serialNumber,
    E: employeeFirstname,
    F: employeeLastname,
    G: employeeWorkId,
    H: employeeEmail,
    I: employeeMobile,
    J: employeeDept,
    K: allocationDate,
    L: allocationStatus,
    M: remarks
  }
}

export const transferExcelHeader = () => {
  const [
    sn,
    brand,
    model,
    serialNumber,
    transferorFirstname,
    transferorLastname,
    transfereeFirstname,
    transfereeLastname,
    transfereeWorkId,
    transfereeEmail,
    transfereeMobile,
    transfereeDept,
    transferDate,
    transferStatus,
    remarks,
  ] = TRANSFER_TABLE_COLUMNS.map((column: ITableColumn) => column.name);

  return {
    A: sn,
    B: brand,
    C: model,
    D: serialNumber,
    E: transferorFirstname,
    F: transferorLastname,
    G: transfereeFirstname,
    H: transfereeLastname,
    I: transfereeWorkId,
    J: transfereeEmail,
    K: transfereeMobile,
    L: transfereeDept,
    M: transferDate,
    N: transferStatus,
    P: remarks
  }
}
