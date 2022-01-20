import { ProductModel } from '~/app/model/productModel';

import { ClienteModel } from './clienteModel';

export interface VendaModel {
  cliente?: ClienteModel;
  produtos?: ProductModel[];
  formaPagamento?: string;
  totalVenda: number;
}
