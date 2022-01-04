import { NextPage } from 'next';

import { Layout } from '~/components/layout';

export const CadastroProduto: NextPage = () => {
  return (
    <Layout title="Cadastro de Produtos">
      <div className="field">
        <label className="label" htmlFor="inputSku">
          SKU *
        </label>
        <div className="control">
          <input
            className="input"
            id="inputSku"
            placeholder="Digite o SKU do produto"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="inputPrice">
          Preço *
        </label>
        <div className="control">
          <input
            className="input"
            id="inputPrice"
            placeholder="Digite o preço do produto"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="inputName">
          Nome *
        </label>
        <div className="control">
          <input
            className="input"
            id="inputName"
            placeholder="Digite o nome do produto"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="inputDescricao">
          Descrição
        </label>
        <div className="control">
          <textarea
            className="textarea"
            id="inputDescricao"
            placeholder="Digite uma descrição detalhada do produto"
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Salvar</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </Layout>
  );
};
