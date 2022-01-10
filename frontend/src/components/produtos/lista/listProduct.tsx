import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { ProductModel } from '~/app/model/productModel';
import { useProductService } from '~/app/service/ProductService';
import { TableProduct } from '~/components/common/table/TableProduct';
import { Layout } from '~/components/layout/Layout';

export const ListProduct: NextPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const service = useProductService();

  useEffect(() => {
    service.getAll().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <Layout title="Listagem de Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-success is-small">Novo</button>
      </Link>
      <TableProduct products={products} />
    </Layout>
  );
};
