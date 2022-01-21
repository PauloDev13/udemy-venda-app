import { ProductModel } from '~/app/model/productModel';

import { ClienteModel } from './clienteModel';

export interface VendaModel {
  cliente?: ClienteModel;
  itens?: ItemVenda[];
  formaPagamento?: string;
  totalVenda: number;
}

export interface ItemVenda {
  produto: ProductModel;
  quantidade: number;
}
