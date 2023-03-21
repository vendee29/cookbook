import { useAuthContext } from "../hooks/useAuthContext";
import { useAddRecipe } from "../hooks/useAddRecipe";

import { CustomizedSnackbar } from "../components/Snackbar";
import { RecipeForm } from "../components/RecipeForm";
import { CreatedRecipe } from "../utils/types";

export const NewRecipe = () => {
  const { state: authState } = useAuthContext();

  const { mutate, error } = useAddRecipe();

  const handleSubmit = async (recipe: CreatedRecipe) => {
    if (authState.user === null) return;
    mutate({ token: authState.user.token, formValues: recipe });
  };

  return (
    <>
      <RecipeForm
        heading="Add a New Recipe"
        buttonTitle="Add Recipe"
        onSubmit={handleSubmit}
      />
      {error && (
        <CustomizedSnackbar severity="error" message="Something went wrong" />
      )}
    </>
  );
};
