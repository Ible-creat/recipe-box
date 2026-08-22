import { useRecipes } from '../context/RecipeContext'

function RecipeDetail({ recipe, onClose }) {
  const { toggleFavorite, deleteRecipe } = useRecipes()

  const totalTime = recipe.prepTime + recipe.cookTime

  function handleDelete() {
    deleteRecipe(recipe.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-6xl rounded-t-lg">
            🍳
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
              {recipe.category && (
                <span className="text-sm text-rose-600 font-medium">{recipe.category}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="text-2xl"
                aria-label="Toggle favorite"
              >
                {recipe.isFavorite ? '❤️' : '🤍'}
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {recipe.description && (
            <p className="text-gray-600 mb-4">{recipe.description}</p>
          )}

          <div className="flex gap-4 text-sm text-gray-500 mb-6">
            {recipe.prepTime > 0 && <span>⏱ Prep: {recipe.prepTime} min</span>}
            {recipe.cookTime > 0 && <span>🔥 Cook: {recipe.cookTime} min</span>}
            {totalTime > 0 && <span>⏰ Total: {totalTime} min</span>}
            {recipe.servings > 0 && <span>🍽 Serves: {recipe.servings}</span>}
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Ingredients</h3>
            <ul className="flex flex-col gap-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {recipe.instructions}
            </p>
          </div>

          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail