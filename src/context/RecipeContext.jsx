import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { createRecipe } from '../utils/recipeSchema'

const RecipeContext = createContext()

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useLocalStorage('recipes', [])

  function addRecipe(recipeData) {
    const newRecipe = createRecipe(recipeData)
    setRecipes([...recipes, newRecipe])
  }

  function deleteRecipe(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
  }

  function updateRecipe(updatedRecipe) {
    setRecipes(recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ))
  }

  function toggleFavorite(id) {
    setRecipes(recipes.map((recipe) =>
      recipe.id === id
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ))
  }

  return (
    <RecipeContext.Provider value={{
      recipes,
      addRecipe,
      deleteRecipe,
      updateRecipe,
      toggleFavorite,
    }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  return useContext(RecipeContext)
}