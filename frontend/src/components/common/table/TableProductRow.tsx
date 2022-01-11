import React from 'react';

import { NextPage } from 'next';

import { ProductModel } from '~/app/model/productModel';
import { convertToReal } from '~/app/util/Converter';

type RowProps = {
  product: ProductModel;
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
};

export const TableProductRow: NextPage<RowProps> = ({
  product,
  onEdit,
  onDelete,
}: RowProps) => {
  const { id, sku, name, price } = product;
  return (
    <tr>
      <td>{id}</td>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{convertToReal(`${price?.toFixed(2)}`)}</td>
      <td>
        <button
          onClick={() => onEdit(id)}
          className="button is-link is-small is-inverted"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(id)}
          className="button is-danger  is-small is-inverted"
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};
