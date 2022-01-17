import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';

import { ClienteModel } from '~/app/model/clienteModel';
import { Input } from '~/components/common/input/Input';

type FormProps = {
  cliente: ClienteModel;
  onSubmit: (cliente: ClienteModel) => void;
};

const formSchema: ClienteModel = {
  id: '',
  name: '',
  email: '',
  cpf: '',
  address: '',
  phone: '',
  dateBirth: '',
  createdAt: '',
};

export const Form: NextPage<FormProps> = ({ cliente, onSubmit }: FormProps) => {
  const formik = useFormik<ClienteModel>({
    initialValues: { ...formSchema, ...cliente },
    onSubmit,
  });

  const caixaAlta = (value: string): string => {
    return value.toUpperCase();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            label="Código: *"
            id="id"
            name="id"
            disabled
            columnClasse="is-half"
            value={formik.values.id}
          />
          <Input
            label="Data Cadastro: *"
            id="createdAt"
            name="createdAt"
            disabled
            columnClasse="is-half"
            value={formik.values.createdAt}
          />
        </div>
      )}
      <div className="columns">
        <Input
          label="Nome: *"
          id="name"
          name="name"
          autoComplete="off"
          columnClasse="is-full"
          formatter={caixaAlta}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <Input
          label="CPF: *"
          id="cpf"
          name="cpf"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.cpf}
          onChange={formik.handleChange}
        />
        <Input
          label="Data Nascimento: *"
          id="dateBirth"
          name="dateBirth"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.dateBirth}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <Input
          label="Endereço: *"
          id="address"
          name="address"
          autoComplete="off"
          columnClasse="is-full"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <Input
          label="Email: *"
          id="email"
          name="email"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Input
          label="Telefone: *"
          id="phone"
          name="phone"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            {formik.values.id ? 'Atualizar' : 'Salvar'}
          </button>
        </div>
        <div className="control">
          <Link href={'/consultas/produtos'}>
            <button className="button is-link is-light">Listar</button>
          </Link>
        </div>
      </div>
    </form>
  );
};
