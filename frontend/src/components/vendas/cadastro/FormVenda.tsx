import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { ClienteModel } from '~/app/model/clienteModel';
import { Page } from '~/app/model/Page';
import { ProductModel } from '~/app/model/productModel';
import { ItemVenda, VendaModel } from '~/app/model/vendaModel';
import { useClienteService } from '~/app/service/ClienteService';
import { useProductService } from '~/app/service/ProductService';
import { validationSchema } from '~/components/vendas/cadastro/validationSchema';

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

interface VendasFormProps {
  onSubmit: (venda: VendaModel) => void;
}

const formSchema: VendaModel = {
  cliente: undefined,
  itens: [],
  formaPagamento: '',
  totalVenda: 0,
};

export const FormVenda: NextPage<VendasFormProps> = ({ onSubmit }) => {
  const clienteService = useClienteService();
  const produtoService = useProductService();

  const formaPagamento = ['DINHEIRO', 'PIX', 'CARTÃO DE CRÉDITO'];

  const [message, setMessage] = useState<string>('');
  const [codigoProduto, setCodigoProduto] = useState<string>('');
  const [qtdProduto, setQtdProduto] = useState<number>(0);
  const [produto, setProduto] = useState<ProductModel>();
  const [listaProdutos, setListaProdutos] = useState<ProductModel[]>([]);
  const [listaFiltradaProdutos, setListFiltradaProdutos] = useState<
    ProductModel[]
  >([]);
  const [clientes, setClientes] = useState<Page<ClienteModel>>({
    content: [],
    page: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  });

  const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
    const name = e.query;

    clienteService.getAllPageable(name, '', 0, 20).then((response) => {
      setClientes(response);
    });
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: ClienteModel = e.value;
    formik.setFieldValue('cliente', clienteSelecionado);
  };

  const handleProdutoAutocomplete = async (
    e: AutoCompleteCompleteMethodParams,
  ) => {
    const name = e.query;

    // if (!listaProdutos.length) {
    //   const produtosEncontrados = await produtoService.getAll();
    //   setListaProdutos(produtosEncontrados);
    // }

    const produtosFiltrados = listaProdutos.filter((produto: ProductModel) => {
      return produto.name?.toUpperCase().includes(name.toUpperCase());
    });

    setListFiltradaProdutos(produtosFiltrados);
  };

  // const handleProdutoChange = (e: AutoCompleteChangeParams) => {
  //   const produtoSelecionado: ProductModel = e.value;
  //   setProduto(produtoSelecionado);
  // };

  const handleCodigoProdutoSelect = () => {
    if (codigoProduto) {
      produtoService
        .getById(codigoProduto)
        .then((response) => {
          setProduto(response);
        })
        .catch((error) => {
          setMessage(error.response.data.titulo);
          setCodigoProduto('');
          setProduto(undefined);
          setQtdProduto(0);
        });
    } else {
      setProduto(undefined);
      setQtdProduto(0);
    }
  };

  const calculaTotalVenda = () => {
    const totais = formik.values.itens?.map(
      (iv: ItemVenda) => Number(iv.produto.price) * iv.quantidade,
    );

    if (totais?.length) {
      return totais.reduce(
        (somaAtual = 0, valorItemAtual) => somaAtual + Number(valorItemAtual),
      );
    }
  };

  const handleAddProduto = () => {
    const itensAdicionados = formik.values.itens;

    const isExistItemVenda = itensAdicionados?.some((iv: ItemVenda) => {
      return iv.produto.id === produto?.id;
    });

    if (isExistItemVenda) {
      itensAdicionados?.forEach((iv: ItemVenda) => {
        if (iv.produto.id === produto?.id) {
          iv.quantidade = iv.quantidade + qtdProduto;
        }
      });
    } else {
      produto &&
        qtdProduto &&
        itensAdicionados?.push({
          produto,
          quantidade: qtdProduto,
        });
    }
    setCodigoProduto('');
    setQtdProduto(0);
    setProduto(undefined);
    // const totalVenda = calculaTotalVenda();
    formik.setFieldValue('totalVenda', calculaTotalVenda());
  };

  const handleRemoverProduto = (id: string) => {
    const result = formik.values.itens?.filter(
      (iv: ItemVenda) => iv.produto.id !== id,
    );
    formik.setFieldValue('itens', result);
    formik.setFieldValue('totalVenda', calculaTotalVenda());
  };

  const actionTemplate = (itens: ItemVenda) => {
    return (
      <div>
        <Button
          type="button"
          label="Excluir"
          className="p-button-text p-button-sm"
          onClick={() => handleRemoverProduto(itens.produto.id!)}
        />
      </div>
    );
  };

  const disableAddProdutoButton = () => {
    return !produto || !qtdProduto;
  };

  const handleDialogFooter = () => {
    return <Button label="Ok" onClick={() => setMessage('')} autoFocus />;
  };

  const formik = useFormik({
    onSubmit,
    initialValues: formSchema,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (!listaProdutos.length) {
      produtoService.getAll().then((response) => {
        setListaProdutos(response);
      });
    }
  }, []);

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
            <small className="p-error block">
              {formik.touched && formik.errors.cliente}
            </small>
          </div>
        </div>
        <div className="grid">
          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText
                type="number"
                className="p-inputtext-sm"
                id="codigo"
                autoFocus
                value={codigoProduto}
                onBlur={handleCodigoProdutoSelect}
                onChange={(e) => setCodigoProduto(e.target.value)}
              />
              <label htmlFor="codigo">Código</label>
            </span>
          </div>
          <div className="field md:col-6">
            <AutoComplete
              className="p-inputtext-sm"
              id="produto"
              name="produto"
              field="name"
              value={produto}
              suggestions={listaFiltradaProdutos}
              completeMethod={handleProdutoAutocomplete}
              onChange={(e) => setProduto(e.value)}
            />
          </div>
          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText
                id="codigo"
                className="p-inputtext-sm"
                value={qtdProduto}
                onChange={(e) => setQtdProduto(+e.target.value)}
              />
              <label htmlFor="codigo">QTD</label>
            </span>
          </div>
          <div className="field col-12 md:col-2">
            <Button
              type="button"
              label="Adicionar"
              className="p-button"
              disabled={disableAddProdutoButton()}
              onClick={handleAddProduto}
            />
          </div>
          <div className="field col-12">
            <DataTable
              value={formik.values.itens}
              size="small"
              emptyMessage={
                formik.errors.itens && (
                  <small className="p-error block">
                    Adicione pelo menos um item na venda
                  </small>
                )
              }
            >
              <Column field="produto.id" header="Código" />
              <Column field="produto.sku" header="SKU" />
              <Column field="produto.name" header="Nome" />
              <Column
                style={{ textAlign: 'center' }}
                field="produto.price"
                header="Preço Unit"
              />
              <Column field="quantidade" header="Qtd" />
              <Column
                style={{ textAlign: 'right' }}
                header="Total"
                body={(iv: ItemVenda) => {
                  return (
                    <div>
                      {formatMoney.format(iv.produto.price! * iv.quantidade)}
                    </div>
                  );
                }}
              />
              <Column header="Opção" body={actionTemplate} />
            </DataTable>
          </div>
          <div className="field col-6">
            <label htmlFor="formaPagamento">Forma de Pagamento: *</label>
            <Dropdown
              id="formaPagamento"
              style={{ height: '45px' }}
              className="p-inputtext-sm"
              name="formaPagamento"
              options={formaPagamento}
              value={formik.values.formaPagamento}
              onChange={(e) => formik.setFieldValue('formaPagamento', e.value)}
              placeholder="Selecione forma de pagamento"
            />
            <small className="p-error block">
              {formik.touched && formik.errors.formaPagamento}
            </small>
          </div>
          <div className="field col-2">
            <label htmlFor="totalItens">Itens:</label>
            <InputText
              id="totalItens"
              style={{ textAlign: 'center' }}
              className="p-inputtext-sm"
              name="totalItens"
              value={formik.values.itens?.length}
            />
          </div>
          <div className="field col-4">
            <label htmlFor="totalItens">Total Venda R$:</label>
            <InputText
              id="total"
              style={{ textAlign: 'right' }}
              className="p-inputtext-sm"
              name="total"
              value={formatMoney.format(formik.values.totalVenda)}
            />
          </div>
        </div>
        <Button label="Finalizar" type="submit" disabled={!formik.isValid} />
      </div>
      <Dialog
        header="ATENÇÃO!!"
        position="top"
        visible={!!message}
        footer={handleDialogFooter}
        onHide={() => setMessage('')}
      >
        {message}
      </Dialog>
    </form>
  );
};
