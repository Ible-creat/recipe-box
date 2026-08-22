import { useState } from 'react'
import { useRecipes } from '../context/RecipeContext'
import RecipeList from '../components/RecipeList'
import AddRecipeForm from '../components/AddRecipeForm'
import { CATEGORIES } from '../utils/recipeSchema'
import RecipeDetail from '../components/RecipeDetail'

function Recipes() {
  const { recipes } = useRecipes()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const filteredRecipes = recipes
    .filter((r) => filterCategory === 'all' || r.category === filterCategory)
    .filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Recipes
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({recipes.length} total)
          </span>
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 text-sm font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Recipe'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add a New Recipe</h3>
          <AddRecipeForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filteredRecipes.length === 0 && recipes.length > 0 && (
        <p className="text-center text-gray-500 py-8">
          No recipes match your search.
        </p>
      )}

      <RecipeList
        recipes={filteredRecipes}
        onSelect={setSelectedRecipe}
      />
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}

export default Recipes