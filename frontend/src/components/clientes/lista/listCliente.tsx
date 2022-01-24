import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable, DataTablePageParams } from 'primereact/datatable';

import { ClienteModel } from '~/app/model/clienteModel';
import { Page } from '~/app/model/Page';
import { useClienteService } from '~/app/service/ClienteService';
import { Input, InputCpf } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

interface SearchFilter {
  nome?: string;
  cpf?: string;
}

const Props: Page<ClienteModel> = {
  content: [],
  number: 0,
  size: 10,
  page: 0,
  totalElements: 0,
};

export const ListCliente: NextPage = () => {
  const [clientes, setClientes] = useState<Page<ClienteModel>>(Props);
  const [loading, setLoading] = useState<boolean>(false);

  const service = useClienteService();

  const handleSubmit = () => {
    handlePage(null);
  };

  const handlePage = (event: DataTablePageParams | any) => {
    setLoading(true);
    service
      .getAllPageable(filter.nome, filter.cpf, event?.page, event?.rows)
      .then((response) => {
        setClientes({ ...response, page: event?.first });
      })
      .finally(() => setLoading(false));
  };

  const {
    handleSubmit: formikSubmit,
    values: filter,
    handleChange,
  } = useFormik<SearchFilter>({
    initialValues: {
      nome: '',
      cpf: '',
    },
    onSubmit: handleSubmit,
  });

  const handleDelete = (id: string) => {
    service.deleteById(id).then(() => {
      handlePage(null);
    });
  };

  const actionTemplate = (registro: ClienteModel) => {
    return (
      <div>
        <Button
          label="Editar"
          className="p-button-text p-button-sm"
          onClick={() => router.push(`/cadastros/clientes?id=${registro.id}`)}
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
              accept: () => handleDelete(registro.id as string),
            });
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    handlePage(null);
  }, []);

  return (
    <Layout title="Listagem de Clientes">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            columnClasse="is-half"
            id="nome"
            label="Nome:"
            name="nome"
            onChange={handleChange}
            value={filter.nome}
          />
          <InputCpf
            columnClasse="is-half"
            id="cpf"
            label="CPF:"
            name="cpf"
            onChange={handleChange}
            value={filter.cpf}
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link is-small">
              Consultar
            </button>
          </div>
          <div className="control">
            <Link href={'/cadastros/clientes'} passHref>
              <button className="button is-success is-small">Novo</button>
            </Link>
          </div>
        </div>
      </form>
      <br />
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy
            paginator
            first={clientes.page}
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            size="small"
            alwaysShowPaginator={false}
            emptyMessage="Nenhum cliente encontrado para os parâmetros informados"
          >
            <Column field="id" header="Código" />
            <Column field="name" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
            <Column header="Opções" body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
