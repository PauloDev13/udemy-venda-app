import { useFormik } from 'formik';
import { NextPage } from 'next';

import { Input, InputCpf } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

interface SearchFilter {
  nome?: string;
  cpf?: string;
}

export const ListCliente: NextPage = () => {
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
    </Layout>
  );
};
