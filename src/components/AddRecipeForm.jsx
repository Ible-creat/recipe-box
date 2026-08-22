import { useState } from 'react'
import { useRecipes } from '../context/RecipeContext'
import { CATEGORIES } from '../utils/recipeSchema'

function AddRecipeForm({ onClose }) {
  const { addRecipe } = useRecipes()
  const [errors, setErrors] = useState({})
  const [ingredientInput, setIngredientInput] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleAddIngredient() {
    if (!ingredientInput.trim()) return
    setForm({ ...form, ingredients: [...form.ingredients, ingredientInput.trim()] })
    setIngredientInput('')
  }

  function handleRemoveIngredient(index) {
    setForm({
      ...form,
      ingredients: form.ingredients.filter((_, i) => i !== index),
    })
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (form.ingredients.length === 0) newErrors.ingredients = 'Add at least one ingredient'
    if (!form.instructions.trim()) newErrors.instructions = 'Instructions are required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    addRecipe({
      ...form,
      prepTime: parseInt(form.prepTime) || 0,
      cookTime: parseInt(form.cookTime) || 0,
      servings: parseInt(form.servings) || 1,
    })
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Recipe title"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description..."
          rows={2}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
            placeholder="e.g. 2 cups flour"
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-rose-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-rose-700"
          >
            Add
          </button>
        </div>
        {form.ingredients.length > 0 && (
          <ul className="flex flex-col gap-1">
            {form.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between items-center text-sm bg-gray-50 px-3 py-1 rounded">
                <span>{ing}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(i)}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructions
        </label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Step by step instructions..."
          rows={4}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        {errors.instructions && <p className="text-red-500 text-xs mt-1">{errors.instructions}</p>}
      </div>

      <div className="grid