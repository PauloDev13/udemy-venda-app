import { NextPage } from 'next';

import { MenuItem } from '~/components/layout/menu/MenuItem';

export const Menu: NextPage = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas Vendas</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/consultas/produtos" label="Produtos" />
        <MenuItem href="/consultas/clientes" label="Clientes" />
        <MenuItem href="/vendas/nova" label="Vendas" />
        <MenuItem href="/vendas/relatorios" label="Relatórios" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
};
