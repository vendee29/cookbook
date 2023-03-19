import * as React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGetMyRecipes } from "../hooks/useGetMyRecipes";

import { RecipeCard } from "../components/RecipeCard";
import { RecipeList } from "../components/RecipeList";

export const MyRecipes = () => {
  const { state: authState } = useAuthContext();
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(
    undefined
  );
  const {
    data: myRecipes,
    isLoading,
    error,
    refetch,
  } = useGetMyRecipes(authState.user?.token, searchTerm);

  React.useEffect(() => {
    if (searchTerm !== undefined) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="recipes">
      {error && <div className="info">Error loading recipes</div>}
      {isLoading && <div className="info">Loading recipes</div>}
      {myRecipes && myRecipes.length > 0 ? (
        <RecipeList>
          {myRecipes.map((recipe) => {
            return (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                onTagClick={handleTagClick}
              />
            );
          })}
        </RecipeList>
      ) : (
        <div className="info">
          <div>There are no recipes here &#x1F914;</div>
          <div>
            You can add your own recipe <Link to="/add">HERE</Link>.
          </div>
        </div>
      )}
    </div>
  );
};
