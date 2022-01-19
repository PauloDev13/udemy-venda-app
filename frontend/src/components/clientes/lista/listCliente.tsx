import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { ClienteModel } from '~/app/model/clienteModel';
import { useClienteService } from '~/app/service/ClienteService';
import { Input, InputCpf } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

interface SearchFilter {
  nome?: string;
  cpf?: string;
}

export const ListCliente: NextPage = () => {
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const service = useClienteService();

  useEffect(() => {
    service.getAll().then((response) => {
      setClientes(response);
    });
  }, []);

  const handleSubmit = (filter: SearchFilter) => {
    console.log(filter);
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
          <DataTable value={clientes} size="small">
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
