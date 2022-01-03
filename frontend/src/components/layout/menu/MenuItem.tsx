import { NextPage } from 'next';

interface MenuItemProps {
  href: string;
  label: string;
}

export const MenuItem: NextPage<MenuItemProps> = ({ href, label }) => {
  return (
    <li>
      <a href={href}>
        <span className="icon">{label}</span>
      </a>
    </li>
  );
};
