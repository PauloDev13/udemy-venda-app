import { NextPage } from 'next';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  label: string;
}

export const MenuItem: NextPage<MenuItemProps> = ({ href, label }) => {
  return (
    <li>
      {href && (
        <Link href={href}>
          <a className="icon">{label}</a>
        </Link>
      )}
      {/*<a href={href}>*/}
      {/*  <span className="icon">{label}</span>*/}
      {/*</a>*/}
    </li>
  );
};
