import { useState } from 'react';

import { NextPage } from 'next';

import { ProductModel } from '~/app/model/productModel';
import { useProductService } from '~/app/service/ProductService';
import { Input } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

export const FormProduct: NextPage = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const service = useProductService();

  const submit = () => {
    const product: ProductModel = {
      sku,
      price: Number(price),
      name,
      description,
    };

    if (id) {
      service.update(id, product).then(() => console.log('Produto atualizado'));
    } else {
      service.save(product).then((response) => {
        setId(response.id ?? '');
        setCreatedAt(response.createdAt ?? '');
      });
    }
  };

  return (
    <Layout title="Cadastro de Produtos">
      {id && (
        <div className="columns">
          <Input
            label="Código"
            columnClasse="is-half"
            id="inputCodigo"
            value={id}
            disabled
          />
          <Input
            label="Data Cadastro"
            columnClasse="is-half"
            id="inputCreated"
            value={createdAt}
            disabled
          />
        </div>
      )}
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
            {id ? 'Atualizar' : 'Salvar'}
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </Layout>
  );
};
