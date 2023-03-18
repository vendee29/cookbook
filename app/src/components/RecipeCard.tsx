import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";

// utils & hooks
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { calculateRating } from "../utils/calculateRating";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRateRecipe } from "../hooks/useRateRecipe";
import { RecipeValue } from "../utils/types";

import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import chevronDown from "../assets/chevronDown.svg";
import recipePlaceholder from "../assets/recipe-placeholder.jpg";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const RecipeCard = (props: {
  recipe: RecipeValue;
  onTagClick: (tag: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const { state: authState } = useAuthContext();

  const { mutate } = useRateRecipe();

  const handleRating = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (!authState.user || value === null) {
      return <Navigate to="/login" />;
    }
    const ratingValues = { recipeId: props.recipe._id, rating: value };
    mutate({ token: authState.user.token, ratingValues });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="recipe-card"
      sx={{
        maxWidth: 345,
        minWidth: 270,
        borderRadius: 2,
        height: "fit-content",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe"></Avatar>
        }
        title={props.recipe.title}
        titleTypographyProps={{
          fontSize: "15px",
          fontWeight: "600",
          fontFamily: "Kurale, serif",
        }}
        subheader={formatDistanceToNow(new Date(props.recipe.createdAt), {
          addSuffix: true,
        })}
        subheaderTypographyProps={{ fontFamily: "Kurale, serif" }}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.recipe.img ?? recipePlaceholder}
        alt={props.recipe.title}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Roboto" }}
        >
          {props.recipe.description}
        </Typography>
        {props.recipe.tags && props.recipe.tags.length > 0 && (
          <div className="recipe-details-tags">
            {props.recipe.tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  label={tag.label}
                  variant="outlined"
                  onClick={() => props.onTagClick(tag.label)}
                  sx={{ fontFamily: "Kurale, serif" }}
                />
              );
            })}
          </div>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Rating
          sx={{ marginRight: 1 }}
          name="simple-controlled"
          value={calculateRating(props.recipe.rating)}
          onChange={handleRating}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Kurale, serif" }}
        >
          {props.recipe.rating?.length + " " + "ratings"}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <img width={20} src={chevronDown}></img>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ fontFamily: "Roboto", padding: "0 auto 0 auto" }}>
          <h4 style={{ fontFamily: "Kurale, serif" }}>Ingredients:</h4>
          {props.recipe.ingredients ? (
            <ul style={{ listStyleType: "circle", fontSize: "14px" }}>
              {props.recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {`${ingredient.amount} ${ingredient.ingredient}`}
                </li>
              ))}
            </ul>
          ) : (
            <div>No ingredients</div>
          )}

          <h4 style={{ fontFamily: "Kurale, serif" }}>Method:</h4>

          {props.recipe.steps && (
            <ReactQuill
              className="recipe-details-steps"
              value={props.recipe.steps}
              readOnly={true}
              theme="bubble"
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
