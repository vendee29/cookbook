import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { throwError } from "../utils/throwError";
import { CreatedRecipe } from "../utils/types";

interface AddRecipeMutation {
  token: string;
  formValues: CreatedRecipe;
}

export function useAddRecipe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"], {
        exact: true,
      });
      navigate("/");
    },
  });
}
