import {
  FaUsers,
  FaClipboardList,
  FaProjectDiagram,
  FaCalendarAlt,
} from "react-icons/fa";
import { MenuItem } from "@/models";

export const ROUTE_SING_IN = "/sign-in";

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    icon: FaCalendarAlt,
    route: "/dashboard",
  },
  {
    label: "Proyectos",
    icon: FaProjectDiagram,
    route: "/projects",
  },
  {
    label: "Reportes",
    icon: FaClipboardList,
    route: "/reports",
  },
  {
    label: "Administración de usuarios",
    icon: FaUsers,
    route: "/users",
  },
];
