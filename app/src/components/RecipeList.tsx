import * as React from "react";
import { Masonry } from "@mui/lab";
import { useTheme, useMediaQuery } from "@mui/material";

export const RecipeList = (props: { children: React.ReactNode }) => {
  const theme = useTheme();
  const matchesSmallest = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesSmall = useMediaQuery(theme.breakpoints.only("sm"));

  return (
    <Masonry
      columns={matchesSmallest ? 1 : matchesSmall ? 2 : 3}
      className="recipe-list"
    >
      {props.children ?? ""}
    </Masonry>
  );
};
