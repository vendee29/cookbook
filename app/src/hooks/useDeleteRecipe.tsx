import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { throwError } from "../utils/throwError";

interface DeleteRecipeMutation {
  token: string;
  recipeId: string;
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, recipeId }: DeleteRecipeMutation) => {
      try {
        const { data } = await axios.delete(
          `/api/recipes/${recipeId}`,

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
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
    },
  });
}
