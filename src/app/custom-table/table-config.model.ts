export interface TableConfig {
  sortableColumns: string[];
  pagination: boolean;
  infiniteScroll: boolean;
  pageSize: number;
  currentPage?: number,
  actionButtons: string[];
  customCellTemplates?: { [key: string]: any };
  totalItems?: number;
}
