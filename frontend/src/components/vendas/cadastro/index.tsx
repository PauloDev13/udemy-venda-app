import { NextPage } from 'next';

import { VendaModel } from '~/app/model/vendaModel';
import { Layout } from '~/components/layout/Layout';
import { FormVenda } from '~/components/vendas/cadastro/FormVenda';

export const Vendas: NextPage = () => {
  const handleSubmit = (venda: VendaModel) => {
    console.log(venda);
  };
  return (
    <Layout title="Cadastro de vendas">
      <FormVenda onSubmit={handleSubmit} />
    </Layout>
  );
};
