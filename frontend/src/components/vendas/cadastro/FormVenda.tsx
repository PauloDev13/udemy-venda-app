import { useState } from 'react';

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

  const formik = useFormik({
    onSubmit,
    initialValues: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="field col-12">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete
            id="cliente"
            name="cliente"
            field="name"
            value={formik.values.cliente}
            suggestions={clientes.content}
            completeMethod={handleClienteAutocomplete}
            onChange={handleClienteChange}
          />
        </div>
        <Button label="Finalizar" type="submit" />
      </div>
    </form>
  );
};
