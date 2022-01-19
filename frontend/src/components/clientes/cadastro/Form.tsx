import { NextPage } from 'next';
import Link from 'next/link';

import { ClienteModel } from '~/app/model/clienteModel';
import { formikCliente } from '~/components/clientes/cadastro/validationSchema';
import {
  Input,
  InputCpf,
  InputDate,
  InputPhone,
} from '~/components/common/input/Input';

type FormProps = {
  cliente: ClienteModel;
  onSubmit: (cliente: ClienteModel) => void;
};

// const formSchema: ClienteModel = {
//   id: '',
//   name: '',
//   email: '',
//   cpf: '',
//   address: '',
//   phone: '',
//   dateBirth: '',
//   dateRegister: '',
// };

export const Form: NextPage<FormProps> = ({ cliente, onSubmit }: FormProps) => {
  const formik = formikCliente(cliente, onSubmit);
  // const formik = useFormik<ClienteModel>({
  //   initialValues: { ...formSchema, ...cliente },
  //   onSubmit,
  //   enableReinitialize: true,
  //   validationSchema,
  // });

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
            value={formik.values.dateRegister}
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
          value={formik.values.name}
          error={formik.errors.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <InputCpf
          label="CPF: *"
          id="cpf"
          name="cpf"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.cpf}
          error={formik.errors.cpf}
          onChange={formik.handleChange}
        />
        <InputDate
          label="Data Nascimento: *"
          id="dateBirth"
          name="dateBirth"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.dateBirth}
          error={formik.errors.dateBirth}
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
          error={formik.errors.address}
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
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        <InputPhone
          label="Telefone: *"
          id="phone"
          name="phone"
          autoComplete="off"
          columnClasse="is-half"
          value={formik.values.phone}
          error={formik.errors.phone}
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
