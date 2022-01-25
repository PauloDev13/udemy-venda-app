import React, { useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Button } from 'primereact/button';

import { ClienteModel } from '~/app/model/clienteModel';
import { Page } from '~/app/model/Page';
import { useClienteService } from '~/app/service/ClienteService';
import { useVendaService } from '~/app/service/VendaService';
import { InputDate } from '~/components/common/input/Input';
import { Layout } from '~/components/layout/Layout';

interface IFormRelatorioVendas {
  cliente: ClienteModel | null;
  dataInicio: string;
  dataFim: string;
}

export const FormRelatorioVendas: NextPage<IFormRelatorioVendas> = () => {
  const clienteService = useClienteService();
  const vendaService = useVendaService();

  const [listaClientes, setListaClientes] = useState<Page<ClienteModel>>({
    content: [],
    page: 0,
    size: 20,
    number: 0,
    totalElements: 0,
  });
  const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
    const name = e.query;

    clienteService.getAllPageable(name, '', 0, 20).then((response) => {
      setListaClientes(response);
    });
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: ClienteModel = e.value;
    formik.setFieldValue('cliente', clienteSelecionado);
  };

  const handleSubmit = (formData: IFormRelatorioVendas) => {
    const { cliente, dataInicio, dataFim } = formData;
    vendaService
      .gerarRelatorioVendas(cliente?.id, dataInicio, dataFim)
      .then((response) => {
        const fileURL = URL.createObjectURL(response);
        window.open(fileURL);
      });
  };

  const formik = useFormik<IFormRelatorioVendas>({
    onSubmit: handleSubmit,
    initialValues: {
      cliente: null,
      dataInicio: '',
      dataFim: '',
    },
  });

  return (
    <Layout title="Relatório de Vendas">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-fluid">
          <div className="grid">
            <div className="field col-12">
              <AutoComplete
                className="p-inputtext-sm"
                id="cliente"
                name="cliente"
                field="name"
                value={formik.values.cliente}
                suggestions={listaClientes.content}
                completeMethod={handleClienteAutocomplete}
                onChange={handleClienteChange}
              />
            </div>
          </div>
          <div className="grid">
            <div className="field col-6">
              <InputDate
                label="Data início"
                id="dataInicio"
                name="dataInicio"
                value={formik.values.dataInicio}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-6">
              <InputDate
                label="Data fim"
                id="dataFim"
                name="dataFim"
                value={formik.values.dataFim}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12">
              <Button label="Gerar Relatório" type="submit" />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};
