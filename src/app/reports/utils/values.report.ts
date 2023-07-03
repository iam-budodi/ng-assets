import {Allocation, Computer, Employee, Transfer} from "../../service";
import {ExcelJson} from "../model/excel-json.model";

export const employeeExcelData = (employees: Employee[], udt: ExcelJson) => {

  return employees.forEach((employee: Employee): void => {
    udt.data.push({
      A: employee.id,
      B: employee.firstName,
      C: employee.middleName,
      D: employee.lastName,
      E: employee.gender,
      F: employee.dateOfBirth,
      G: employee.age,
      H: employee.email,
      I: employee.mobile,
      J: employee.workId,
      K: employee.hireDate,
      L: employee.status,
      M: employee.timeOfService,
      N: employee.department?.departmentName,
      O: employee.address?.street,
      P: employee.address?.ward,
      Q: employee.address?.district,
      R: employee.registeredBy,
      S: employee.registeredAt,
      T: employee.updatedBy,
      U: employee.updatedAt
    });
  });
}

export const computerExcelData = (computers: Computer[], udt: ExcelJson) => {

  return computers.forEach((computer: Computer): void => {
    udt.data.push(
      {
        A: computer.id,
        B: computer.brand,
        C: computer.model,
        D: computer.modelNumber,
        E: computer.serialNumber,
        F: computer.manufacturer,
        G: computer.processor,
        H: computer.memory,
        I: computer.storage,
        J: computer.displaySize,
        K: computer.peripherals,
        L: computer.category?.name,
        M: computer.purchase.purchaseDate,
        N: computer.purchase.invoiceNumber,
        O: computer.operatingSystem,
        P: computer.createdBy,
        Q: computer.createdAt,
        R: computer.updatedBy,
        S: computer.updatedAt
      }
    );
  });
}


export const allocationExcelData = (allocations: Allocation[], udt: ExcelJson) => {
  return allocations.forEach((allocation: Allocation): void => {
    udt.data.push(
      {
        A: allocation.id,
        B: allocation.asset.brand,
        C: allocation.asset.model,
        D: allocation.asset.serialNumber,
        E: allocation.employee.firstName,
        F: allocation.employee.lastName,
        G: allocation.employee.workId,
        H: allocation.employee.email,
        I: allocation.employee.mobile,
        J: allocation.employee.department?.departmentName,
        K: allocation.allocationDate,
        L: allocation.status,
        M: allocation.allocationRemark
      }
    )
  });
}

export const transferExcelData = (transfers: Transfer[], udt: ExcelJson) => {
  return transfers.forEach((transfer: Transfer): void => {
    udt.data.push(
      {
        A: transfer.id,
        B: transfer.asset.brand,
        C: transfer.asset.model,
        D: transfer.asset.serialNumber,
        E: transfer.employee.firstName,
        F: transfer.employee.lastName,
        G: transfer.newEmployee.firstName,
        H: transfer.newEmployee.lastName,
        I: transfer.newEmployee.workId,
        J: transfer.newEmployee.email,
        K: transfer.newEmployee.mobile,
        L: transfer.newEmployee.department,
        M: transfer.transferDate,
        N: transfer.status,
        P: transfer.transferRemark
      }
    )
  });
}
