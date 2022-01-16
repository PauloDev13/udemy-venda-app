import { NextPage } from 'next';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  label: string;
}

export const MenuItem: NextPage<MenuItemProps> = ({
  href,
  label,
}: MenuItemProps) => {
  return (
    <li>
      {href && (
        <Link href={href} passHref>
          <a className="icon">{label}</a>
        </Link>
      )}
    </li>
  );
};
