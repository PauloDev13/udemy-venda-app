import { ProductModel } from '~/app/model/productModel';
import { TableProductRow } from '~/components/common/table/TableProductRow';

type TableProductProps = {
  products: ProductModel[];
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
};

export const TableProduct = ({
  products,
  onEdit,
  onDelete,
}: TableProductProps) => {
  return (
    <table className="table is-striped is-hovered">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>price</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <TableProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};
