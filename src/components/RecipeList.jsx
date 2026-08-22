import RecipeCard from './RecipeCard'

function RecipeList({ recipes, onSelect }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🍳</p>
        <p className="text-gray-500 text-lg">
          No recipes yet. Add your first recipe!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default RecipeList