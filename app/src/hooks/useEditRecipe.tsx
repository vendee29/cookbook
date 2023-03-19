import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { throwError } from "../utils/throwError";
import { CreatedRecipe, RecipeValue } from "../utils/types";

interface EditRecipeMutation {
  token: string;
  recipeId: string;
  formValues: CreatedRecipe;
}

export function useEditRecipe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ token, recipeId, formValues }: EditRecipeMutation) => {
      try {
        const { data } = await axios.put(
          `/api/recipes/${recipeId}`,
          formValues,
          {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return data;
      } catch (err) {
        throwError(err);
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data: RecipeValue) => {
      queryClient.invalidateQueries(["recipes", data._id]);
      navigate("/");
    },
  });
}
