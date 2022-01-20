import React from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';

import { ClienteModel } from '~/app/model/clienteModel';
import { ProductModel } from '~/app/model/productModel';

type TableProductProps = {
  products: ProductModel[];
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
};

export const TableProduct = ({
  products,
  onEdit,
  onDelete,
}: TableProductProps) => {
  const actionTemplate = (registro: ClienteModel) => {
    return (
      <div>
        <Button
          label="Editar"
          className="p-button-text p-button-sm"
          onClick={() => onEdit(registro.id)}
        />
        <Button
          label="Excluir"
          className="p-button-text p-button-danger p-button-sm"
          onClick={() => {
            confirmDialog({
              message: `Confirma a exclusão de ${registro.name}?`,
              header: 'Confirmação',
              acceptClassName: 'p-button-danger',
              acceptLabel: 'Sim',
              rejectLabel: 'Não',
              accept: () => onDelete(registro.id),
            });
          }}
        />
      </div>
    );
  };
  return (
    <DataTable
      value={products}
      paginator
      rows={5}
      size="small"
      alwaysShowPaginator={false}
    >
      <Column header="Código" field="id" />
      <Column header="SKU" field="sku" />
      <Column header="price" field="price" />
      <Column header="Opções" body={actionTemplate} />
    </DataTable>
  );
};
