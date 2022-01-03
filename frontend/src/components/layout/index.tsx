import { NextPage } from 'next';

import { Menu } from '~/components/layout/menu';

export const Layout: NextPage = () => {
  return (
    <div className={'app'}>
      <section className={'main-content columns is-fullheight'}>
        <Menu />
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">Cadastro</p>
              </div>
              <div className="card-content">
                <div className="content">conteúdo</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
