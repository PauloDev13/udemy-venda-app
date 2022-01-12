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

  const getAll = async (): Promise<ProductModel[]> => {
    const response: AxiosResponse<ProductModel[]> = await httpClient.get(
      resourceUrl,
    );
    return response.data;
  };

  const getById = async (id: any): Promise<ProductModel> => {
    const { data }: AxiosResponse<ProductModel> = await httpClient.get(
      `${resourceUrl}/${id}`,
    );
    return data;

    // const response: AxiosResponse<ProductModel> = await httpClient.get(
    //   `resourceUrl/${id}`,
    // );
    // return response.data;
  };
  const deleteById = async (id: any): Promise<void> => {
    await httpClient.delete<void>(`${resourceUrl}/${id}`);
  };

  return {
    save,
    getAll,
    getById,
    deleteById,
    update,
  };
};
