import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import menuIcon from "../assets/menu.svg";

export const TemporaryDrawer = (props: { disabled: boolean }) => {
  const [state, setState] = React.useState(false);
  const queryClient = useQueryClient();

  const allRecipesHandler = () => {
    const allRecipes = queryClient.getQueryData(["recipes", "all"], {
      exact: true,
    });
    queryClient.setQueryData(["recipes"], allRecipes);
  };

  const myRecipesHandler = () => {
    const allRecipes = queryClient.getQueryData(["recipes", "me"], {
      exact: true,
    });
    queryClient.setQueryData(["recipes"], allRecipes);
  };

  const toggleDrawer = (open: boolean) => () => {
    setState(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      sx={{ fontFamily: "Kurale, serif" }}
    >
      <h3 className="drawer-heading">Recipes</h3>
      <Divider />
      <div className="drawer-list">
        <Link to="/" onClick={allRecipesHandler}>
          All recipes
        </Link>
        <Link to="/myrecipes" onClick={myRecipesHandler}>
          My recipes
        </Link>
        <Link to="/add">Add new</Link>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ minWidth: 20 }}
        disabled={props.disabled}
      >
        <img src={menuIcon} alt="menu" width={20} />
      </IconButton>
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
