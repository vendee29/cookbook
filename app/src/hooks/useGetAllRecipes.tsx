import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { throwError } from "../utils/throwError";
import { RecipeValue } from "../utils/types";

export function useGetAllRecipes(
  token: string | undefined,
  searchTerm: string | undefined
): UseQueryResult<RecipeValue[] | null, Error> {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const url =
        searchTerm !== undefined
          ? `/api/recipes/all?q=${searchTerm}`
          : `/api/recipes/all`;
      try {
        const result = await axios.get<RecipeValue[] | null>(url, {
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
