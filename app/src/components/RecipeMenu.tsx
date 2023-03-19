import * as React from "react";
import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";
import verticalMenu from "../assets/menu-vertical.svg";

export const RecipeMenu = (props: {
  recipeId: string;
  disabledButtons: boolean;
}) => {
  const { state: authState } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  const { mutate } = useDeleteRecipe();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action: string) => {
    setAnchorEl(null);
    if (action === "Edit") {
      setShouldNavigate(true);
    }
    if (action === "Delete" && authState.user) {
      mutate({ recipeId: props.recipeId, token: authState.user.token });
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ paddingRight: 0 }}
      >
        <img src={verticalMenu} alt="menu icon" height={25} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{ fontFamily: "Kurale, serif" }}
          onClick={() => handleClose("Edit")}
          disabled={props.disabledButtons}
        >
          Edit
        </MenuItem>
        <MenuItem
          sx={{ fontFamily: "Kurale, serif" }}
          onClick={() => handleClose("Delete")}
          disabled={props.disabledButtons}
        >
          Delete
        </MenuItem>
      </Menu>
      {shouldNavigate && <Navigate to={`/edit/${props.recipeId}`} />}
    </div>
  );
};
