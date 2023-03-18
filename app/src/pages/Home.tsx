import * as React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";

// components
import { RecipeCard } from "../components/RecipeCard";
import { RecipeList } from "../components/RecipeList";
import { Search } from "../components/Search";

export const Home = () => {
  const { state: authState } = useAuthContext();

  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(
    undefined
  );
  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useGetAllRecipes(authState.user?.token, searchTerm);

  React.useEffect(() => {
    if (searchTerm !== undefined) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const searchHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="home">
      <Search onSearch={searchHandler} />
      <div className="recipes">
        {error && <div>Error loading recipes</div>}
        {isLoading && <div>Loading recipes</div>}
        {recipes && (
          <RecipeList>
            {recipes.map((recipe) => {
              return (
                <RecipeCard
                  recipe={recipe}
                  key={recipe._id}
                  onTagClick={handleTagClick}
                />
              );
            })}
          </RecipeList>
        )}
      </div>
    </div>
  );
};
