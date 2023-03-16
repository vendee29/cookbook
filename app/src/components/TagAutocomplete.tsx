import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetAllTags } from "../hooks/useGetAllTags";
import { useAuthContext } from "../hooks/useAuthContext";

export const TagAutocomplete = (props: {
  onAddTags: (tags: string[]) => void;
}) => {
  const { state: authState } = useAuthContext();
  const { data: tags } = useGetAllTags(authState.user?.token);
  const tagsChangeHandler = (
    ev: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    // console.log(newValue);
    props.onAddTags(newValue);
  };
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tags ?? []}
      defaultValue={[]}
      freeSolo
      size="small"
      className="tag-autocomplete"
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="filled" label={option} {...getTagProps({ index })} />
        ))
      }
      onChange={tagsChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          hiddenLabel={true}
          placeholder="Add tags (breakfast, vegan, gluten-free...)"
        />
      )}
    />
  );
};
