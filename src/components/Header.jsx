import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-rose-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">🍳 Recipe Box</h1>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Recipes
          </NavLink>
          <NavLink
            to="/meal-plan"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Meal Plan
          </NavLink>
          <NavLink
            to="/shopping-list"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Shopping List
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header