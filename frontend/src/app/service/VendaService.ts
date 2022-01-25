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

  const gerarRelatorioVendas = async (
    clienteId = '',
    dataInicio = '',
    dataFim = '',
  ): Promise<Blob> => {
    const url = `${resourceUrl}/relatorio-vendas?id=${clienteId}&inicio=${dataInicio}&fim=${dataFim}`;
    const response: AxiosResponse = await httpClient.get(url, {
      responseType: 'blob',
    });
    const bytes = response.data;
    return new Blob([bytes], { type: 'application/pdf' });
  };

  return {
    save,
    gerarRelatorioVendas,
  };
};
