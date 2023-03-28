export interface ITableColumn {
  name: string; // column name
  dataKey: string; // name of the key of actual data in the column
  position?: 'right' | 'left'; // should be right or left aligned
  isSortable?: boolean; // can a column be sorted
}
