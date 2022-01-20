import { useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { ClienteModel } from '~/app/model/clienteModel';
import { Page } from '~/app/model/Page';
import { VendaModel } from '~/app/model/vendaModel';
import { useClienteService } from '~/app/service/ClienteService';

interface VendasFormProps {
  onSubmit: (venda: VendaModel) => void;
}

const formSchema: VendaModel = {
  cliente: undefined,
  produtos: [],
  formaPagamento: '',
  totalVenda: 0,
};

export const FormVenda: NextPage<VendasFormProps> = ({ onSubmit }) => {
  const service = useClienteService();

  const [codigoProduto, setCodigoProduto] = useState<string>('');
  const [clientes, setClientes] = useState<Page<ClienteModel>>({
    content: [],
    page: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  });

  const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
    const name = e.query;
    service.getAllPageable(name, '', 0, 20).then((response) => {
      setClientes(response);
    });
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: ClienteModel = e.value;
    formik.setFieldValue('cliente', clienteSelecionado);
  };

  const handleCodigoProdutoSelect = () => {
    console.log(codigoProduto);
  };

  const formik = useFormik({
    onSubmit,
    initialValues: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="grid">
          <div className="field col-12">
            <label htmlFor="cliente">Cliente: *</label>
            <AutoComplete
              className="p-inputtext-sm"
              id="cliente"
              name="cliente"
              field="name"
              value={formik.values.cliente}
              suggestions={clientes.content}
              completeMethod={handleClienteAutocomplete}
              onChange={handleClienteChange}
            />
          </div>
        </div>
        <div className="grid">
          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText
                className="p-inputtext-sm"
                id="codigo"
                value={codigoProduto}
                onBlur={handleCodigoProdutoSelect}
                onChange={(e) => setCodigoProduto(e.target.value)}
              />
              <label htmlFor="codigo">Código</label>
            </span>
          </div>
          <div className="field md:col-6">
            <AutoComplete className="p-inputtext-sm" />
          </div>
          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText id="codigo" className="p-inputtext-sm" />
              <label htmlFor="codigo">QTD</label>
            </span>
          </div>
          <div className="field col-12 md:col-2">
            <Button label="Adicionar" className="p-button" />
          </div>
        </div>
        <Button label="Finalizar" type="submit" />
      </div>
    </form>
  );
};
