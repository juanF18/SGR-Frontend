import React, { useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { MenuItem } from "@/models";
import { useRouter } from "next/navigation";

export function CustomDrawer() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState<Record<string, boolean>>({});

  const toggleDrawer = () => {
    setOpen((prevOpen) => {
      if (prevOpen) {
        setSubMenuOpen({});
      }
      return !prevOpen;
    });
  };

  const handleSubMenuToggle = (menu: string) => {
    setOpen(true); // Asegura que el drawer esté abierto
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavigation = (route?: string) => {
    if (route) {
      setOpen(true); // Asegura que el drawer esté abierto
      router.push(route);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "Usuarios",
      icon: <FaUsersLine size={30} />,
      route: "/users",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "flex-end" : "center",
            p: 1,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <ListItem
                component="button"
                onClick={
                  item.subOptions
                    ? () => handleSubMenuToggle(item.label)
                    : () => handleNavigation(item.route)
                }
                sx={{
                  backgroundColor: "white",
                  my: "8px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#2196f3",
                    color: "white",
                  },
                  overflow: "hidden",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 1,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
                {item.subOptions &&
                  (subMenuOpen[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.subOptions && (
                <Collapse
                  in={subMenuOpen[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subOptions.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        component="button"
                        sx={{
                          pl: 4,
                          backgroundColor: "white",
                          margin: "4px 16px",
                          borderRadius: "8px", // Bordes redondeados
                          boxShadow: "none", // Elimina sombra
                          border: "none", // Asegura que no haya borde
                          "&:hover": {
                            backgroundColor: "#2196f3", // Azul en hover
                            color: "white", // Texto blanco en hover
                          },
                          overflow: "hidden", // Asegura que no haya esquinas planas
                        }}
                        onClick={() => handleNavigation(subItem.route)}
                      >
                        <ListItemIcon sx={{ color: "inherit" }}>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={subItem.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
