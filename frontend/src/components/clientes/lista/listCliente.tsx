import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import { Column } from 'primereact/column';
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

  const handleSubmit = (event: any) => {
    handlePage(event);
  };

  const handlePage = (event: DataTablePageParams) => {
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

  useEffect(() => {
    handleSubmit(null);
    // setLoading(true);
    // service
    //   .getAllPageable()
    //   .then((response) => {
    //     setClientes({ ...response, page: -1 });
    //   })
    //   .finally(() => setLoading(false));
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
            <button type="submit" className="button is-link">
              Consultar
            </button>
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
            emptyMessage="Nenhum cliente encontrado para os parâmetros informados"
          >
            <Column field="id" header="Código" />
            <Column field="name" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
