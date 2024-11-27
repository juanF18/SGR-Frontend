"use client";
import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import { StarBorder, Menu as MenuIcon } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/constants";
import { useAdminContext } from "@/context/PageContext";

const DRAWER_WIDTH = 240;
const CLOSED_DRAWER_WIDTH = 60;

export function CustomDrawer() {
  const pathname = usePathname();
  const router = useRouter();
  const { drawerOpen, toggleDrawer } = useAdminContext();
  const [subMenuOpen, setSubMenuOpen] = React.useState<Record<string, boolean>>(
    {}
  );

  const handleSubMenuToggle = (menu: string) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavigation = (route?: string) => {
    if (route) {
      router.push(route);
    }
  };

  const getActiveStyle = (route?: string) => {
    return pathname === route ? { backgroundColor: "#d0e8fc" } : {};
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: drawerOpen ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List>
        {MENU_ITEMS.map((item, index) => (
          <Box
            key={index}
            sx={{
              px: 1,
              display: "flex",
            }}
          >
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
                  backgroundColor: "#1C4E80",
                  color: "white",
                },
                ...getActiveStyle(item.route),
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                px: drawerOpen ? "20px" : "8px",
                justifyContent: drawerOpen ? "center" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: drawerOpen ? 1 : 0,
                  width: drawerOpen ? "auto" : "100px",
                }}
              >
                <item.icon size={20} />
              </ListItemIcon>

              {drawerOpen && <ListItemText primary={item.label} />}
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
                        borderRadius: "8px",
                        boxShadow: "none",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "#2196f3",
                          color: "white",
                        },
                        ...getActiveStyle(subItem.route), // Aquí también aplicamos el estilo activo para submenús
                        overflow: "hidden",
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
  );
}
