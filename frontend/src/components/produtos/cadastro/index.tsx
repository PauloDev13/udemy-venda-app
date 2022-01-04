import { useState } from 'react';

import { NextPage } from 'next';

import { Layout } from '~/components/layout';

export const CadastroProduto: NextPage = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    const produto = {
      sku,
      price,
      name,
      description,
    };
    // eslint-disable-next-line no-console
    console.log(produto);
  };

  return (
    <Layout title="Cadastro de Produtos">
      <div className="columns">
        <div className="field is-half column">
          <label className="label" htmlFor="inputSku">
            SKU *
          </label>
          <div className="control">
            <input
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              className="input"
              id="inputSku"
              placeholder="Digite o SKU do produto"
            />
          </div>
        </div>
        <div className="field is-half column">
          <label className="label" htmlFor="inputPrice">
            Preço *
          </label>
          <div className="control">
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="input"
              id="inputPrice"
              placeholder="Digite o preço do produto"
            />
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="field is-full column">
          <label className="label" htmlFor="inputName">
            Nome *
          </label>
          <div className="control">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input"
              id="inputName"
              placeholder="Digite o nome do produto"
            />
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="field is-full column">
          <label className="label" htmlFor="inputDescricao">
            Descrição
          </label>
          <div className="control">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="textarea"
              id="inputDescricao"
              placeholder="Digite uma descrição detalhada do produto"
            />
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link">
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </Layout>
  );
};
