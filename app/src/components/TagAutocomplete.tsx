import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetAllTags } from "../hooks/useGetAllTags";

export const TagAutocomplete = (props: {
  onAddTags: (tags: string[]) => void;
  currentTags: string[];
}) => {
  const { state: authState } = useAuthContext();
  const { data: tags } = useGetAllTags(authState.user?.token);
  const [value, setValue] = React.useState<string[]>(props.currentTags);

  const tagsChangeHandler = (
    ev: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setValue(newValue);
  };

  const handleBlur = () => {
    props.onAddTags(value);
  };

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tags ?? []}
      value={value}
      freeSolo
      size="small"
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line
          <Chip variant="filled" label={option} {...getTagProps({ index })} />
        ))
      }
      onChange={tagsChangeHandler}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          hiddenLabel={true}
          placeholder="Add tags (breakfast, vegan, gluten-free...)"
        />
      )}
    />
  );
};
