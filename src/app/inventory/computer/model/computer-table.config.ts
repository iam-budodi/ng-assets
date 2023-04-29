import {ITableColumn} from "../../../shared/models/table-column.model";

export const COMPUTER_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Brand', dataKey: 'brand', isSortable: true},
  {name: 'Model Name', dataKey: 'model', isSortable: true},
  {name: 'Model Number', dataKey: 'modelNumber', isSortable: true},
  {name: 'Serial Number', dataKey: 'serialNumber', isSortable: true},
  {name: 'Manufacturer', dataKey: 'manufacturer', isSortable: true},
  {name: 'Processor', dataKey: 'processor', isSortable: true},
  {name: 'Memory', dataKey: 'memory', isSortable: true},
  {name: 'Storage', dataKey: 'storage', isSortable: true},
  {name: 'Display', dataKey: 'displaySize', isSortable: true},
  {name: 'Peripherals', dataKey: 'peripherals', isSortable: true},
  {name: 'Category', dataKey: 'category.name', isSortable: true},
  {name: 'Purchased Date', dataKey: 'purchase.purchaseDate', isSortable: true},
  {name: 'Purchase Invoice', dataKey: 'purchase.invoiceNumber', isSortable: false},
  {name: 'OS', dataKey: 'operatingSystem', isSortable: true},
]
