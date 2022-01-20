import { useFormik } from 'formik';
import { NextPage } from 'next';
import { AutoComplete } from 'primereact/autocomplete';

import { VendaModel } from '~/app/model/vendaModel';

interface VendasFormProps {
  onSubmit: (venda: VendaModel) => void;
}

const formSchema: VendaModel = {
  cliente: {},
  produtos: [],
  formaPagamento: '',
  totalVenda: 0,
};

export const FormVenda: NextPage<VendasFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    onSubmit,
    initialValues: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="field col-12">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete id="cliente" name="cliente" />
        </div>
      </div>
    </form>
  );
};
