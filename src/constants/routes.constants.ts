import { FaUsersLine } from "react-icons/fa6";
import { MenuItem } from "@/models";

export const ROUTE_SING_IN = "/sign-in";

export const menuItems: MenuItem[] = [
  {
    label: "Usuarios",
    icon: FaUsersLine,
    route: "/users",
  },
];
