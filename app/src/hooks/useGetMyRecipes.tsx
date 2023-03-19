import axios from "axios";
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import { throwError } from "../utils/throwError";
import { RecipeValue } from "../utils/types";

export function useGetMyRecipes(
  token: string | undefined,
  searchTerm: string | undefined
): UseQueryResult<RecipeValue[] | null, Error> {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const url =
        searchTerm !== undefined
          ? `/api/recipes/me?q=${searchTerm}`
          : `/api/recipes/me`;
      try {
        const result = await axios.get<RecipeValue[] | null>(url, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus(status) {
            return status === 200;
          },
        });
        if (searchTerm === undefined) {
          queryClient.setQueryData(["recipes", "me"], result.data);
        }
        return result.data;
      } catch (err) {
        throwError(err);
      }
    },
    enabled: token !== undefined,
  });
}
