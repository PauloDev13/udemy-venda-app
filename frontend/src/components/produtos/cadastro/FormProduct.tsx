import { ChangeEvent, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { ProductModel } from '~/app/model/productModel';
import { useProductService } from '~/app/service/ProductService';
import { convertToBigdecimal, convertToReal } from '~/app/util/Converter';
import { Input, InputMoney } from '~/components/common/input/Input';
import { Ierror, IMessage } from '~/components/common/interfaces';
import { Layout } from '~/components/layout/Layout';

const msgRequired = 'é obrigatório!';

const validationSchema = yup.object().shape({
  sku: yup
    .string()
    .trim()
    .required(`SKU ${msgRequired}!`)
    .min(5, 'SKU deve ter no mínimo 5 caracteres!'),
  name: yup
    .string()
    .trim()
    .required(`NOME ${msgRequired}!`)
    .min(5, 'NOME deve ter no mínimo 5 caracteres!'),
  price: yup
    .number()
    .required()
    .moreThan(0, 'PREÇO deve ser maior que 0,00 (zero)!'),
  description: yup.string().trim().required(`DESCRIÇÃO ${msgRequired}!`),
});

export const FormProduct: NextPage = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [errors, setErrors] = useState<Ierror>({});

  const service = useProductService();

  const router = useRouter();
  const { prodId } = router.query;

  useEffect(() => {
    if (prodId) {
      service
        .getById(prodId)
        .then(
          ({
            id,
            sku,
            name,
            price,
            description,
            createdAt,
            updatedAt,
          }: ProductModel) => {
            setId(id ?? '');
            setSku(sku ?? '');
            setName(name ?? '');
            setPrice(convertToReal(`${price?.toFixed(2)}`));
            setDescription(description ?? '');
            setCreatedAt(createdAt ?? '');
            setUpdatedAt(updatedAt ?? '');
          },
        );
    }
  }, []);

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
        setErrors({});

        if (id) {
          service
            .update(id, product)
            .then((response) => {
              setMessages([
                {
                  message: `Produto ${response.name?.toUpperCase()} atualizado com sucesso`,
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
            .save(product)
            .then((response) => {
              setId(response.id ?? '');
              setCreatedAt(response.createdAt ?? '');
              setMessages([
                {
                  message: `Produto ${response.name?.toUpperCase()} adicionado com sucesso`,
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
      })
      .catch((err) => {
        const field = err.path;
        const message = err.message;

        setErrors({
          [field]: message,
        });
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
          <Input
            label="Data Atualização"
            columnClasse="is-half"
            id="inputUpdated"
            value={updatedAt}
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
          error={errors.sku}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSku(e.target.value)
          }
          placeholder="Digite o SKU do produto"
        />
        <InputMoney
          label="Preço *"
          columnClasse="is-half"
          id="inputPrice"
          value={price}
          maxLength={16}
          error={errors.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          placeholder="Digite o preço do produto"
        />
      </div>

      <div className="columns">
        <Input
          label="Nome *"
          columnClasse="is-full"
          id="inputName"
          value={name}
          error={errors.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
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
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(event.target.value)
              }
              className="textarea"
              id="inputDescricao"
              placeholder="Digite uma descrição detalhada do produto"
            />
            {errors.description && (
              <p className="help is-danger">{errors.description}</p>
            )}
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
          <Link href={'/consultas/produtos'}>
            <button className="button is-link is-light">Listar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
