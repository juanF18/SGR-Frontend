import { IconType } from 'react-icons';

export interface MenuItem {
  label: string;
  icon: IconType;
  route?: string;
  subOptions?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  route: string;
}
