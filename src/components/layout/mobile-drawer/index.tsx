"use client"
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

import Drawer from "@mui/material/Drawer";
import Sidebar from "../sidebar"; // Adjust this path if needed
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
export default function MobileDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="block sm:hidden">
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
        <MenuOpenRoundedIcon />
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className="h-20"></div>
        <Sidebar />
      </Drawer>
    </div>
  );
}
