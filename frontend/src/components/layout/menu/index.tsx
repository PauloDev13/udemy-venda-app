import { NextPage } from 'next';

export const Menu: NextPage = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Minhas Vendas</p>
      <ul className="menu-list">
        <li>
          <a href="#">
            <span className="icon">Home</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};
