import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import { EditRecipe } from "./pages/EditRecipe";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyRecipes } from "./pages/MyRecipes";
import { Navbar } from "./components/Navbar";
import { NewRecipe } from "./pages/NewRecipe";
import { Signup } from "./pages/Signup";

function App() {
  const { state: authState } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={authState.user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!authState.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authState.user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/add"
              element={
                authState.user ? <NewRecipe /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/edit/:recipeId"
              element={
                authState.user ? <EditRecipe /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/myrecipes"
              element={
                authState.user ? <MyRecipes /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
