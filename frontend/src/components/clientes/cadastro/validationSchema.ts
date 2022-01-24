import { useFormik } from 'formik';
import * as yup from 'yup';

import { ClienteModel } from '~/app/model/clienteModel';

const msgRequired = 'é obrigatório!';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(`EMAIL ${msgRequired}!`)
    .email('Email inválido!'),
  name: yup
    .string()
    .trim()
    .required(`NOME ${msgRequired}!`)
    .min(5, 'NOME deve ter no mínimo 5 caracteres!'),
  cpf: yup.string().required(`CPF ${msgRequired}!`).length(14, 'CPF inválido!'),
  address: yup.string().trim().required(`ENDEREÇO ${msgRequired}!`),
  dateBirth: yup
    .string()
    .trim()
    .required(`DATA NASC. ${msgRequired}!`)
    .length(10, 'Data inválida'),
  // phone: yup.string().trim().required(`TELEFONE ${msgRequired}!`),
});

const formSchema: ClienteModel = {
  id: '',
  name: '',
  email: '',
  cpf: '',
  address: '',
  phone: '',
  dateBirth: '',
  dateRegister: '',
  updatedAt: '',
};

export const formikCliente = (
  cliente: ClienteModel,
  onSubmit: (cliente: ClienteModel) => void,
) => {
  return useFormik<ClienteModel>({
    initialValues: { ...formSchema, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema,
  });
};
