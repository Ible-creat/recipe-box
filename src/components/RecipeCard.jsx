import { useRecipes } from '../context/RecipeContext'

function RecipeCard({ recipe, onSelect }) {
  const { deleteRecipe, toggleFavorite } = useRecipes()

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-4xl">
          🍳
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            onClick={() => onSelect && onSelect(recipe)}
            className="font-bold text-gray-800 cursor-pointer hover:text-rose-600"
          >
            {recipe.title}
          </h3>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="text-xl"
          >
            {recipe.isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {recipe.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}

        <div className="flex gap-3 text-xs text-gray-400 mb-3">
          {totalTime > 0 && <span>⏱ {totalTime} min</span>}
          {recipe.servings > 0 && <span>🍽 {recipe.servings} servings</span>}
          {recipe.category && (
            <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
              {recipe.category}
            </span>
          )}
        </div>

        <button
          onClick={() => deleteRecipe(recipe.id)}
          aria-label={`Delete ${recipe.title}`}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default RecipeCard