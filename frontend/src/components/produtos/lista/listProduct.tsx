import { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { httpClient } from '~/app/http/axios';
import { ProductModel } from '~/app/model/productModel';
import { useProductService } from '~/app/service/ProductService';
import { IMessage } from '~/components/common/interfaces';
import { Loader } from '~/components/common/loader/Loader';
import { TableProduct } from '~/components/common/table/TableProduct';
import { Layout } from '~/components/layout/Layout';

export const ListProduct: NextPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [listProducts, setListProducts] = useState<ProductModel[]>([]);

  const router = useRouter();
  const service = useProductService();

  const { data: products } = useSWR<AxiosResponse<ProductModel[]>>(
    '/api/products',
    (url: string) => httpClient.get(url),
  );
  // const [products, setProducts] = useState<ProductModel[]>([]);
  // const service = useProductService();
  //
  // useEffect(() => {
  //   service.getAll().then((response) => {
  //     setProducts(response);
  //   });
  // }, []);

  const onEdit = async (id: any) => {
    await router.push(`/cadastros/produtos?prodId=${id}`);
  };

  useEffect(() => {
    setListProducts(products?.data ?? []);
  }, [products]);

  const onDelete = async (id: any) => {
    await service.deleteById(id).then(() => {
      setMessages([
        {
          type: 'success',
          message: `Produto com ID: ${id} excluído com sucesso!`,
        },
      ]);

      const listProductsUpdated: ProductModel[] = listProducts.filter(
        (p: ProductModel) => p.id !== id,
      );
      setListProducts(listProductsUpdated);
    });
  };

  return (
    <Layout title="Listagem de Produtos" messages={messages}>
      {!products ? (
        <Loader />
      ) : (
        <>
          <Link href={'/cadastros/produtos'} passHref>
            <button className="button is-success is-small">Novo</button>
          </Link>
          <TableProduct
            onEdit={onEdit}
            onDelete={onDelete}
            products={listProducts}
          />
        </>
      )}
    </Layout>
  );
};
