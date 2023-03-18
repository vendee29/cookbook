import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import menu from "../assets/menu.svg";

export const TemporaryDrawer = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{fontFamily: "Kurale, serif"}}
    >
      <h3 style={{textAlign: "center"}}>Recipes</h3>
      <Divider />
      <div style={{display: "flex", flexDirection: "column", textAlign: "center", marginTop: 20, gap: 10}}>
        <Link className="drawer-link" to="/">All recipes</Link>
        <Link className="drawer-link" to="/">My recipes</Link>
        <Link className="drawer-link" to="/add">Add new</Link>
      </div>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ minWidth: 20 }}>
        <img src={menu} alt="menu" width={20} />
      </Button>
      <Drawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: "200px" } }}
      >
        {list()}
      </Drawer>
    </div>
  );
};
