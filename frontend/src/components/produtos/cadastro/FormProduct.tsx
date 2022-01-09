import { useState } from 'react';

import { NextPage } from 'next';
import * as yup from 'yup';

import { ProductModel } from '~/app/model/productModel';
import { useProductService } from '~/app/service/ProductService';
import { convertToBigdecimal } from '~/app/util/Converter';
import { Input } from '~/components/common/input/Input';
import { IMessage } from '~/components/common/interfaces';
import { Layout } from '~/components/layout/Layout';

const msgRequired = 'é obrigatório!';

const validationSchema = yup.object().shape({
  sku: yup
    .string()
    .trim()
    .required(msgRequired)
    .min(5, 'deve ter no mínimo 5 caracteres!'),
  name: yup.string().trim().required(msgRequired),
  price: yup
    .number()
    .required(msgRequired)
    .moreThan(0, 'deve ser maior que 0,00 (zero)!'),
  description: yup.string().trim().required(msgRequired),
});

export const FormProduct: NextPage = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const service = useProductService();

  const submit = () => {
    const product: ProductModel = {
      sku,
      price: convertToBigdecimal(price),
      name,
      description,
    };

    validationSchema
      .validate(product)
      .then(() => {
        if (id) {
          service.update(id, product).then(
            () => {
              setMessages([
                {
                  message: 'Produto atualizado com sucesso',
                  type: 'success',
                },
              ]);
            },
            () => {
              setMessages([
                {
                  message: 'Erro ao Salvar/Alterar produto!',
                  type: 'danger',
                },
              ]);
            },
          );
        } else {
          service.save(product).then(
            (response) => {
              setId(response.id ?? '');
              setCreatedAt(response.createdAt ?? '');
              setMessages([
                {
                  message: 'Produto adicionado com sucesso!',
                  type: 'success',
                },
              ]);
            },
            () => {
              setMessages([
                {
                  message: 'Erro ao Salvar/Alterar produto!',
                  type: 'danger',
                },
              ]);
            },
          );
        }
      })
      .catch((err) => {
        let field = err.path;
        const message = err.message;

        if (field == 'name') {
          field = 'NOME';
        } else if (field == 'price') {
          field = 'PREÇO';
        } else if (field == 'description') {
          field = 'DESCRIÇÃO';
        } else {
          field = 'SKU';
        }

        setMessages([
          {
            type: 'danger',
            field,
            message,
          },
        ]);
      });
  };

  return (
    <Layout title="Cadastro de Produtos" messages={messages}>
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
          currency
          maxLength={16}
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
