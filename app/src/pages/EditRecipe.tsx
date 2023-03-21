import { useParams, Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEditRecipe } from "../hooks/useEditRecipe";
import { useGetRecipe } from "../hooks/useGetRecipe";

import { CustomizedSnackbar } from "../components/Snackbar";
import { RecipeForm } from "../components/RecipeForm";
import { CreatedRecipe } from "../utils/types";

export const EditRecipe = () => {
  const { state: authState } = useAuthContext();
  const { mutate, error: editError } = useEditRecipe();
  const { recipeId } = useParams();
  if (recipeId === undefined) {
    return <Navigate to="/" />;
  }
  const {
    data: recipe,
    isLoading,
    error,
  } = useGetRecipe(authState.user?.token, recipeId);

  if(recipe?.user_id !== authState.user?.id) {
    return <Navigate to="/" />
  }

  const handleSubmit = (editedRecipe: CreatedRecipe) => {
    if (!authState.user) return;
    mutate({ token: authState.user.token, recipeId, formValues: editedRecipe });
  };

  return (
    <>
      {error && <div>Error loading recipe</div>}
      {isLoading && <div>Loading recipe</div>}
      {recipe && (
        <RecipeForm
          heading="Edit Recipe"
          buttonTitle="Edit Recipe"
          {...recipe}
          onSubmit={handleSubmit}
        />
      )}
      {editError && <CustomizedSnackbar severity="error" message="Oops! Something went wrong..."/>}
    </>
  );
};
