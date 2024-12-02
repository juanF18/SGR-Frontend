import {
  FaUsers,
  FaClipboardList,
  FaProjectDiagram,
  FaCalendarAlt,
  FaBuilding,
} from 'react-icons/fa';
import { MenuItem } from '@/models';

export const ROUTE_SIGN_IN = '/sign-in';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_PROJECTS = '/projects';
export const ROUTE_REPORTS = '/reports';
export const ROUTE_USERS = '/users';
export const ROUTE_ENTITIES = '/entities';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: FaCalendarAlt,
    route: ROUTE_DASHBOARD,
  },
  {
    label: 'Proyectos',
    icon: FaProjectDiagram,
    route: ROUTE_PROJECTS,
  },
  {
    label: 'Reportes',
    icon: FaClipboardList,
    route: ROUTE_REPORTS,
  },
  {
    label: 'Usuarios',
    icon: FaUsers,
    route: ROUTE_USERS,
  },
  {
    label: 'Entidades',
    icon: FaBuilding,
    route: ROUTE_ENTITIES,
  },
];
