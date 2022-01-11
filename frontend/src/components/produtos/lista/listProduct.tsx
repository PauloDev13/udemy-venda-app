import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

import { httpClient } from '~/app/http/axios';
import { ProductModel } from '~/app/model/productModel';
import { TableProduct } from '~/components/common/table/TableProduct';
import { Layout } from '~/components/layout/Layout';

export const ListProduct: NextPage = () => {
  const { data: products } = useSWR<AxiosResponse<ProductModel[]>>(
    '/api/products',
    (url: string) => httpClient.get(url),
  );
  // if (!products) {
  //   return <div>Carregando</div>;
  // }
  // const [products, setProducts] = useState<ProductModel[]>([]);
  // const service = useProductService();
  //
  // useEffect(() => {
  //   service.getAll().then((response) => {
  //     setProducts(response);
  //   });
  // }, []);

  return (
    <Layout title="Listagem de Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-success is-small">Novo</button>
      </Link>
      {products && <TableProduct products={products.data} />}
    </Layout>
  );
};
