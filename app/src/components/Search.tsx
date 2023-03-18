import * as React from "react";

export const Search = (props: { onSearch: (searchTerm: string) => void }) => {
  const searchSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const searchTerm = ev.currentTarget.elements.namedItem(
      "search"
    ) as HTMLInputElement;
    props.onSearch(searchTerm.value);
  };
  return (
    <form onSubmit={searchSubmitHandler} style={{ display: "flex" }}>
      <input type="text" name="search" placeholder="Search" />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
};
