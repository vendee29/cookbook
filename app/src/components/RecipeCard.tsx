import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Rating from "@mui/material/Rating";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { calculateRating } from "../utils/calculateRating";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRateRecipe } from "../hooks/useRateRecipe";
import { RecipeMenu } from "./RecipeMenu";
import { RecipeValue } from "../utils/types";

// assets
import chevronDown from "../assets/chevronDown.svg";
import recipePlaceholder from "../assets/recipe-placeholder.jpg";
import { CustomizedSnackbar } from "./Snackbar";

interface ExpandMoreProps {
  expand: boolean;
  onClick: () => void;
}

const ExpandMore = ({ expand, onClick }: ExpandMoreProps) => {
  const classNames = ["expand-more", expand ? "rotate" : ""].join(" ");
  return (
    <div className={classNames} onClick={onClick}>
      <img width={20} src={chevronDown} />
    </div>
  );
};

export const RecipeCard = (props: {
  recipe: RecipeValue;
  onTagClick: (tag: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const { state: authState } = useAuthContext();

  const { mutateAsync, error } = useRateRecipe();

  const handleRating = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value === null) {
      value = calculateRating(props.recipe.rating);
    }
    const token = authState.user?.token ?? undefined
    const ratingValues = { recipeId: props.recipe._id, rating: value };
    mutateAsync({ token, ratingValues });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
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
          avatar={<Avatar sx={{ bgcolor: "#e57373" }} aria-label="recipe" />}
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
          action={
            <RecipeMenu
              recipeId={props.recipe._id}
              disabledButtons={authState.user?.id !== props.recipe.user_id}
            />
          }
        />

        <CardMedia
          component="img"
          height="194"
          image={props.recipe.img && props.recipe.img.length > 0 ? props.recipe.img : recipePlaceholder}
          alt={props.recipe.title}
        />
        <CardContent className="card-content">
          <p>{props.recipe.description}</p>
          {props.recipe.tags && props.recipe.tags.length > 0 && (
            <div className="recipe-details-tags">
              {props.recipe.tags.map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    label={tag.label}
                    variant="outlined"
                    onClick={() => props.onTagClick(tag.label)}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
        <CardActions disableSpacing sx={{ padding: "0 8px 15px 8px" }}>
          <Rating
            sx={{ marginRight: 1 }}
            name="simple-controlled"
            value={calculateRating(props.recipe.rating)}
            onChange={handleRating}
          />
          <span className="card-ratings">
            {props.recipe.rating?.length + " " + "ratings"}
          </span>
          <ExpandMore expand={expanded} onClick={handleExpandClick} />
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            className="expanded-card-content"
            sx={{ padding: "0 auto 0 auto" }}
          >
            <p className="servings-time">
              Servings: {props.recipe.servings ?? ""} | Time:{" "}
              {props.recipe.time ?? ""}
            </p>
            <h4>Ingredients:</h4>
            {props.recipe.ingredients && props.recipe.ingredients.length > 0 ? (
              <ul>
                {props.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {`${ingredient.amount} ${ingredient.ingredient}`}
                  </li>
                ))}
              </ul>
            ) : (
              <div>No ingredients</div>
            )}

            <h4>Method:</h4>
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
      {error && (
        <CustomizedSnackbar severity="error" message="Something went wrong" />
      )}
    </>
  );
};
