import { useState } from 'react';

import { NextPage } from 'next';

import { ClienteModel } from '~/app/model/clienteModel';
import { Form } from '~/components/clientes/cadastro/Form';
import { Layout } from '~/components/layout/Layout';

export const FormCliente: NextPage = () => {
  const [cliente, setCliente] = useState<ClienteModel>({});

  const handleSubmit = (cliente: ClienteModel) => {
    console.log(cliente);
  };

  return (
    <Layout title="Cadastro de Clientes">
      <Form cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
