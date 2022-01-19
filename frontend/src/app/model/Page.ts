export interface Page<T> {
  content: T[];
  size: number;
  number: number;
  totalElements: number;
  page: number;
}
