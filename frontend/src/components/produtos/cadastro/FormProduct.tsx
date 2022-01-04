import { useState } from 'react';

import { NextPage } from 'next';

import { Input } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

export const FormProduct: NextPage = () => {
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
    console.log(produto);
  };

  return (
    <Layout title="Cadastro de Produtos">
      <div className="columns">
        <Input
          label="SKU *"
          columnClasse="is-half"
          id="inputSku"
          value={sku}
          onChange={setSku}
          placeholder="Digite o SKU do produto"
        />
        <Input
          label="Preço *"
          columnClasse="is-half"
          id="inputPrice"
          value={price}
          onChange={setPrice}
          placeholder="Digite o preço do produto"
        />
      </div>

      <div className="columns">
        <Input
          label="Nome *"
          columnClasse="is-full"
          id="inputName"
          value={name}
          onChange={setName}
          placeholder="Digite o nome do produto"
        />
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
