import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { throwError } from "../utils/throwError";
import { CreatedRecipe, RecipeValue } from "../utils/types";

interface AddRecipeMutation {
  token: string;
  formValues: CreatedRecipe;
}

export function useAddRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, formValues }: AddRecipeMutation) => {
      try {
        const { data } = await axios.post(`/api/recipes`, formValues, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus(status) {
            return status === 200;
          },
        });
        return data;
      } catch (err) {
        throwError(err);
      }
    },
    onError: (error) => {
        console.log(error)
    },
    onSuccess: (data: RecipeValue) => {
        console.log("SUCCESS");
        console.log(data)
      queryClient.invalidateQueries(["recipes"], {
        exact: true,
      });
    },
  });
}
