import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { httpClient } from '~/app/http/axios';
import { ProductModel } from '~/app/model/productModel';
import { Loader } from '~/components/common/loader/Loader';
import { TableProduct } from '~/components/common/table/TableProduct';
import { Layout } from '~/components/layout/Layout';

export const ListProduct: NextPage = () => {
  const router = useRouter();

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

  const onDelete = async (id: any) => {
    await router.push(`/cadastros/produtos?prodId=${id}`);
  };

  return (
    <Layout title="Listagem de Produtos">
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
            products={products?.data || []}
          />
        </>
      )}
    </Layout>
  );
};
