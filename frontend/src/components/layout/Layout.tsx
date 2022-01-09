import { ReactNode } from 'react';

import { NextPage } from 'next';

import { IMessage } from '~/components/common/interfaces';
import { Message } from '~/components/common/message/message';
import { Menu } from '~/components/layout/menu';

interface LayoutProps {
  title?: string;
  children?: ReactNode;
  messages?: IMessage[];
}

export const Layout: NextPage<LayoutProps> = ({
  title,
  messages,
  children,
}: LayoutProps) => {
  return (
    <div className={'app'}>
      <section className={'main-content columns is-fullheight'}>
        <Menu />
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">{title}</p>
              </div>
              <div className="card-content">
                <div className="content">
                  {messages &&
                    messages.map((msg) => (
                      <Message key={msg.message} {...msg} />
                    ))}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
