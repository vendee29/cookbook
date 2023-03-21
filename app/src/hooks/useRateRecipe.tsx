import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { throwError } from "../utils/throwError";

interface RateRecipeMutation {
  token: string | undefined;
  ratingValues: { rating: number; recipeId: string };
}

export function useRateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, ratingValues }: RateRecipeMutation) => {
      try {
        const { data } = await axios.patch(
          `/api/recipes/${ratingValues.recipeId}`,
          { rating: ratingValues.rating },
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
      queryClient.invalidateQueries(["recipes"], {
        exact: true,
      });
    },
  });
}
