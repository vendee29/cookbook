import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useAddRecipe } from "../hooks/useAddRecipe";
import { TagAutocomplete } from "../components/TagAutocomplete";
import recipeLogo from "../assets/recipe.svg";

export const NewRecipe = () => {
  const { state: authState } = useAuthContext();

  const [steps, setSteps] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const { mutate } = useAddRecipe();

  // handling ingredient fields

  const [ingredientFields, setIngredientFields] = React.useState<
    Record<string, string>[]
  >([{ ingredient: "", amount: "" }]);

  const changeIngredients = (index: number, event: any) => {
    let data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
  };

  const addIngredientFields = () => {
    const newField = { ingredient: "", amount: "" };
    setIngredientFields([...ingredientFields, newField]);
  };

  const removeIngredientFields = (index: number) => {
    let data = [...ingredientFields];
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

    if (!authState.user) {
      return <Navigate to="/login" />;
    }
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
    console.log({ recipe });
    mutate({ token: authState.user.token, formValues: recipe });
  };

  return (
    <form className="create-recipe" onSubmit={handleSubmit}>
      <h3 className="form-heading">Add a New Recipe</h3>

      <img
        src={recipeLogo}
        alt="recipe-book"
        width={70}
        style={{ display: "block", margin: "0 auto" }}
      />

      <br />

      <label>Title:</label>
      <input type="text" name="title" required className="form-input" />

      <label>Description:</label>
      <textarea name="description" className="form-input" />

      <label>Image URL:</label>
      <input type="url" name="image-url" className="form-input" />

      <div className="form-small">
        <label className="form-small-label">Servings:</label>
        <input type="number" name="servings" className="form-small-input" />
        <label className="form-small-label">Time:</label>
        <input type="text" name="time" className="form-small-input" />
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
              className="ingredient-input"
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              onChange={(event) => changeIngredients(index, event)}
              required
              className="ingredient-input"
            />
            <button
              className="form-remove-btn"
              onClick={() => removeIngredientFields(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <button type="button" onClick={addIngredientFields}>
        Add More..
      </button>

      <div className="form-editor">
        <label>Steps:</label>
        <ReactQuill
          theme="snow"
          value={steps}
          onChange={setSteps}
          className="markdown-editor"
        />
      </div>

      <label>Tags:</label>
      <TagAutocomplete onAddTags={addTagsHandler} />

      <label>Private:</label>
      <input type="checkbox" name="private" className="private-checkbox" />

      <button type="submit">Add Recipe</button>
    </form>
  );
};
