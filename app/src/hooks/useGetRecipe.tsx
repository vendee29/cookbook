import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { throwError } from "../utils/throwError";
import { RecipeValue } from "../utils/types";

export function useGetRecipe(
  token: string | undefined,
  recipeId: string
): UseQueryResult<RecipeValue | null, Error> {
  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      const url = `/api/recipes/${recipeId}`;
      try {
        const result = await axios.get<RecipeValue | null>(url, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus(status) {
            return status === 200;
          },
        });
        return result.data;
      } catch (err) {
        throwError(err);
      }
    },
    enabled: token !== undefined,
  });
}
