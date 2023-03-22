import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useAuthContext } from "../hooks/useAuthContext";
import { TagAutocomplete } from "../components/TagAutocomplete";
import { CreatedRecipe } from "../utils/types";
import recipeIcon from "../assets/recipe.svg";

interface RecipeFormProps extends CreatedRecipe {
  heading: string;
  buttonTitle: string;
  onSubmit: (recipe: CreatedRecipe) => void;
}

export const RecipeForm = (props: RecipeFormProps) => {
  const { state: authState } = useAuthContext();

  const [steps, setSteps] = React.useState(props.steps);
  const [tags, setTags] = React.useState<string[]>(
    props.tags?.map((tag) => tag.label) ?? []
  );

  // handling ingredient fields

  const [ingredientFields, setIngredientFields] = React.useState<
    Record<string, string>[]
  >(props.ingredients ? props.ingredients : [{ ingredient: "", amount: "" }]);

  const changeIngredients = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
  };

  const addIngredientFields = () => {
    const newField = { ingredient: "", amount: "" };
    setIngredientFields([...ingredientFields, newField]);
  };

  const removeIngredientFields = (index: number) => {
    const data = [...ingredientFields];
    data.splice(index, 1);
    setIngredientFields(data);
  };

  // handling tags

  const addTagsHandler = (labels: string[]) => {
    setTags(labels);
  };

  // submitting form

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!authState.user) return;

    const inputTitle = ev.currentTarget.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const inputDescription = ev.currentTarget.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const inputServings = ev.currentTarget.elements.namedItem(
      "servings"
    ) as HTMLInputElement;
    const inputTime = ev.currentTarget.elements.namedItem(
      "time"
    ) as HTMLInputElement;
    const inputIngredients = ingredientFields as unknown as {
      ingredient: string;
      amount: string;
    }[];
    const inputImageUrl = ev.currentTarget.elements.namedItem(
      "image-url"
    ) as HTMLInputElement;
    const inputPrivate = ev.currentTarget.elements.namedItem(
      "private"
    ) as HTMLInputElement;
    const recipe = {
      title: inputTitle.value,
      description: inputDescription.value,
      servings: Number(inputServings.value),
      time: inputTime.value,
      ingredients: inputIngredients,
      steps,
      img: inputImageUrl.value,
      private: inputPrivate.checked,
      tags: tags.map((tag) => ({ label: tag })),
    };
    props.onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h3>{props.heading}</h3>
      <img src={recipeIcon} alt="recipe-book" />
      <label>Title:</label>
      <input
        type="text"
        name="title"
        required
        defaultValue={props.title ? props.title : ""}
      />

      <label>Description:</label>
      <textarea
        name="description"
        defaultValue={props.description ? props.description : ""}
      />
      <label>Image URL:</label>
      <input
        type="url"
        name="image-url"
        defaultValue={props.img ? props.img : ""}
      />

      <div className="form-small">
        <label>Servings:</label>
        <input
          type="number"
          name="servings"
          defaultValue={props.servings ? props.servings : ""}
        />
        <label>Time:</label>
        <input
          type="text"
          name="time"
          defaultValue={props.time ? props.time : ""}
        />
      </div>

      <label>Ingredients:</label>
      {ingredientFields.map((input, index) => {
        return (
          <div key={index} className="form-ingredient">
            <input
              type="text"
              name="ingredient"
              placeholder="Ingredient"
              onChange={(event) => changeIngredients(index, event)}
              required
              defaultValue={input.ingredient ? input.ingredient : ""}
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              onChange={(event) => changeIngredients(index, event)}
              required
              defaultValue={input.amount ? input.amount : ""}
            />
            <button
              className="ingredient-btn"
              onClick={() => removeIngredientFields(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        className="ingredient-btn"
        type="button"
        onClick={addIngredientFields}
      >
        Add More..
      </button>

      <div className="form-editor">
        <label>Method:</label>
        <ReactQuill
          theme="snow"
          value={steps}
          onChange={setSteps}
          className="markdown-editor"
        />
      </div>

      <label>Tags:</label>
      <TagAutocomplete onAddTags={addTagsHandler} currentTags={tags} />

      <div className="private">
        <label>Private:</label>
        <input type="checkbox" name="private" defaultChecked={props.private} />
      </div>
      <button type="submit">{props.buttonTitle}</button>
    </form>
  );
};
