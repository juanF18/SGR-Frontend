import {
  FaUsers,
  FaClipboardList,
  FaProjectDiagram,
  FaCalendarAlt,
  FaBuilding,
  FaTasks,
} from 'react-icons/fa';
import { MenuItem } from '@/models';
import { AiOutlineBarChart } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';

export const ROUTE_SIGN_IN = '/sign-in';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_PROJECTS = '/projects';
export const ROUTE_REPORTS = '/reports';
export const ROUTE_USERS = '/users';
export const ROUTE_TASKS = '/tasks';
export const ROUTE_ENTITIES = '/entities';
export const ROUTE_ACTIVITIES = '/activities';
export const ROUTE_RUBROS = '/rubros';

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
    label: 'Actividades',
    icon: FaClipboardList,
    route: ROUTE_ACTIVITIES,
  },
  {
    label: 'Tareas',
    icon: FaTasks,
    route: ROUTE_TASKS,
  },
  {
    label: 'Rubros',
    icon: MdCategory,
    route: ROUTE_RUBROS,
  },
  {
    label: 'Reportes',
    icon: AiOutlineBarChart,
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
