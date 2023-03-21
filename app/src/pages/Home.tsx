import * as React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";

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
        {error && <div className="info">Error loading recipes</div>}
        {isLoading && <div className="info">Loading recipes...</div>}
        {recipes && recipes.length > 0 && (
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
        {recipes && recipes.length < 1 && (
          <div className="info">
            <div>There are no recipes here &#x1F914;</div>
            <div>
              You can add your own recipe <Link to="/add">HERE</Link>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
