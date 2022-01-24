import { AxiosResponse } from 'axios';

import { httpClient } from '~/app/http/axios';
import { VendaModel } from '~/app/model/vendaModel';

const resourceUrl = '/api/vendas';

export const useVendaService = () => {
  const save = async (venda: VendaModel): Promise<VendaModel> => {
    const response: AxiosResponse<VendaModel> =
      await httpClient.post<VendaModel>(resourceUrl, venda);
    return response.data;
  };

  return {
    save,
  };
};
