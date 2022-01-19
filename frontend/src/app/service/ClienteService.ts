import { AxiosResponse } from 'axios';

import { httpClient } from '~/app/http/axios';
import { ClienteModel } from '~/app/model/clienteModel';
import { Page } from '~/app/model/Page';

const resourceUrl = '/api/clientes';

export const useClienteService = () => {
  const save = async (cliente: ClienteModel): Promise<ClienteModel> => {
    const response: AxiosResponse<ClienteModel> = await httpClient.post(
      resourceUrl,
      cliente,
    );
    return response.data;
  };

  const update = async (
    id: string,
    cliente: ClienteModel,
  ): Promise<ClienteModel> => {
    const response: AxiosResponse<ClienteModel> = await httpClient.put(
      `${resourceUrl}/${id}`,
      cliente,
    );
    return response.data;
  };

  const getAll = async (): Promise<ClienteModel[]> => {
    const response: AxiosResponse<ClienteModel[]> = await httpClient.get(
      resourceUrl,
    );
    return response.data;
  };

  const getAllPageable = async (
    name = '',
    cpf = '',
    page = 0,
    size = 5,
  ): Promise<Page<ClienteModel>> => {
    const response: AxiosResponse<Page<ClienteModel>> = await httpClient.get(
      `${resourceUrl}/?name=${name}&cpf=${cpf}&page=${page}&size=${size}`,
    );
    return response.data;
  };

  const getById = async (id: any): Promise<ClienteModel> => {
    const { data }: AxiosResponse<ClienteModel> = await httpClient.get(
      `${resourceUrl}/${id}`,
    );
    return data;

    // const response: AxiosResponse<ClienteModel> = await httpClient.get(
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
    getAllPageable,
    getById,
    deleteById,
    update,
  };
};
