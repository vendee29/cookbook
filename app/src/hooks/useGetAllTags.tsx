import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { throwError } from "../utils/throwError";

export function useGetAllTags(
  token: string | undefined
): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      try {
        const result = await axios.get<string[]>(
          `/api/recipes/tags`,
          {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return result.data;
      } catch (err) {
        throwError(err);
      }
    },
    enabled: token !== undefined,
  });
}