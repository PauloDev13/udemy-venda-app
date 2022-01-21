import * as yup from 'yup';

const msgRequired = 'é obrigatório!';

export const validationSchema = yup.object().shape({
  cliente: yup.object().nullable(true).required(`CLIENTE ${msgRequired}!`),
  itens: yup.array().min(1, 'Deve conter pelo menos um produto!'),
  formaPagamento: yup
    .string()
    .trim()
    .required(`FORMA DE PAGAMENTO ${msgRequired}!`),
});
//
// const formSchema: ClienteModel = {
//   id: '',
//   name: '',
//   email: '',
//   cpf: '',
//   address: '',
//   phone: '',
//   dateBirth: '',
//   dateRegister: '',
// };
//
// export const formikCliente = (
//   cliente: ClienteModel,
//   onSubmit: (cliente: ClienteModel) => void,
// ) => {
//   return useFormik<ClienteModel>({
//     initialValues: { ...formSchema, ...cliente },
//     onSubmit,
//     enableReinitialize: true,
//     validationSchema,
//   });
// };
