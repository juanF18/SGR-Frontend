export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  route?: string;
  subOptions?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  route: string;
}
