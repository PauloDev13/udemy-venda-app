import { useState } from 'react';

import { NextPage } from 'next';

import { VendaModel } from '~/app/model/vendaModel';
import { useVendaService } from '~/app/service/VendaService';
import { IMessage } from '~/components/common/interfaces';
import { Layout } from '~/components/layout/Layout';
import { FormVenda } from '~/components/vendas/cadastro/FormVenda';

export const Vendas: NextPage = () => {
  const service = useVendaService();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [vendaRealizada, setVendaRealizada] = useState<boolean>(false);

  const handleNovaVenda = () => {
    setVendaRealizada(false);
    setMessages([]);
  };

  const handleSubmit = (venda: VendaModel) => {
    service
      .save(venda)
      .then((response) => {
        setVendaRealizada(true);
        setMessages([
          {
            message: `Venda para o Cliente: ${response.cliente?.name?.toUpperCase()} 
            finalizada com sucesso`,
            type: 'success',
          },
        ]);
      })
      .catch((error) => {
        const { data } = error.response;
        setMessages([
          {
            message: `ERRO: ${data.message}`,
            type: 'danger',
          },
        ]);
      });
  };
  return (
    <Layout title="Cadastro de vendas" messages={messages}>
      <FormVenda
        onSubmit={handleSubmit}
        vendaRealizada={vendaRealizada}
        onNovaVenda={handleNovaVenda}
      />
    </Layout>
  );
};
