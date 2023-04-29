import {ITableColumn} from "../../../shared/models/table-column.model";

export const PURCHASE_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Order Invoice', dataKey: 'invoiceNumber', isSortable: true},
  {name: 'Order Date', dataKey: 'purchaseDate', isSortable: true},
  {name: 'Purchase price', dataKey: 'purchasePrice', isSortable: true},
  {name: 'Purchase Quantity', dataKey: 'purchaseQty', isSortable: true},
  {name: 'Order Cost', dataKey: 'totalPurchaseCost', isSortable: true},
  {name: 'Supplier Name', dataKey: 'supplier.name', isSortable: true},
  {name: 'Supplier Email', dataKey: 'supplier.email', isSortable: true},
  {name: 'Supplier Office Phone', dataKey: 'supplier.phone', isSortable: true},
  {name: 'Supplier Website', dataKey: 'supplier.website', isSortable: false},
]
