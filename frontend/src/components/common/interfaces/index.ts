export interface IMessage {
  type: string;
  field?: string;
  message: string;
}

export interface Ierror {
  sku?: string;
  name?: string;
  price?: string;
  description?: string;
}
