import { AxiosResponse } from 'axios';

import { httpClient } from '~/app/http/axios';
import { ProductModel } from '~/app/model/productModel';

const resourceUrl = '/api/products';

export const useProductService = () => {
  const save = async (product: ProductModel): Promise<ProductModel> => {
    const response: AxiosResponse<ProductModel> = await httpClient.post(
      resourceUrl,
      product,
    );
    return response.data;
  };

  const update = async (
    id: string,
    product: ProductModel,
  ): Promise<ProductModel> => {
    const response: AxiosResponse<ProductModel> = await httpClient.put(
      `${resourceUrl}/${id}`,
      product,
    );
    return response.data;
  };

  const getAll = async () => {
    const response: AxiosResponse<ProductModel> = await httpClient.get(
      resourceUrl,
    );
    return response.data;
  };

  return {
    save,
    getAll,
    update,
  };
};
