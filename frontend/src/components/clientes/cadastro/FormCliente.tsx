import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ClienteModel } from '~/app/model/clienteModel';
import { useClienteService } from '~/app/service/ClienteService';
import { convertDate } from '~/app/util/Converter';
import { Form } from '~/components/clientes/cadastro/Form';
import { IMessage } from '~/components/common/interfaces';
import { Layout } from '~/components/layout/Layout';

export const FormCliente: NextPage = () => {
  const service = useClienteService();
  const router = useRouter();
  const { id } = router.query;

  const [cliente, setCliente] = useState<ClienteModel>({});
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSubmit = (cliente: ClienteModel) => {
    cliente.dateBirth = convertDate(cliente.dateBirth ?? '');

    if (cliente.id) {
      service
        .update(cliente.id, cliente)
        .then((response) => {
          setMessages([
            {
              message: `Cliente ${response.name?.toUpperCase()} atualizado com sucesso`,
              type: 'success',
            },
          ]);
        })
        .catch((error) => {
          const { data } = error.response;
          setMessages([
            {
              message: `ERRO: ${data.titulo}`,
              type: 'danger',
            },
          ]);
        });
    } else {
      service
        .save(cliente)
        .then((response) => {
          setCliente(response);
          setMessages([
            {
              message: `Cliente ${response.name?.toUpperCase()} adicionado com sucesso`,
              type: 'success',
            },
          ]);
        })
        .catch((error) => {
          const { data } = error.response;
          setMessages([
            {
              message: `ERRO: ${data.titulo}`,
              type: 'danger',
            },
          ]);
        });
    }
  };

  useEffect(() => {
    if (id) {
      service.getById(id).then((response) => {
        setCliente(response);
      });
    }
  }, []);

  return (
    <Layout title="Cadastro de Clientes" messages={messages}>
      <Form cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
