import React from 'react';

import { NextPage } from 'next';

import { ProductModel } from '~/app/model/productModel';

type RowProps = {
  product: ProductModel;
};

export const TableProductRow: NextPage<RowProps> = ({ product }: RowProps) => {
  const { id, sku, name, price } = product;
  return (
    <tr>
      <td>{id}</td>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <button className="button is-link is-small is-inverted">Editar</button>
        <button className="button is-danger  is-small is-inverted">
          Editar
        </button>
      </td>
    </tr>
  );
};
