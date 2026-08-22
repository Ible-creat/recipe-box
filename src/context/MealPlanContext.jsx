import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const MealPlanContext = createContext()

export function MealPlanProvider({ children }) {
  const [mealPlan, setMealPlan] = useLocalStorage('mealPlan', {})

  function addMeal(date, mealType, recipe) {
    const key = `${date}-${mealType}`
    setMealPlan({ ...mealPlan, [key]: recipe })
  }

  function removeMeal(date, mealType) {
    const key = `${date}-${mealType}`
    const updated = { ...mealPlan }
    delete updated[key]
    setMealPlan(updated)
  }

  function getMeal(date, mealType) {
    const key = `${date}-${mealType}`
    return mealPlan[key] || null
  }

  function clearWeek(dates) {
    const updated = { ...mealPlan }
    dates.forEach((date) => {
      ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
        delete updated[`${date}-${mealType}`]
      })
    })
    setMealPlan(updated)
  }

  return (
    <MealPlanContext.Provider value={{
      mealPlan,
      addMeal,
      removeMeal,
      getMeal,
      clearWeek,
    }}>
      {children}
    </MealPlanContext.Provider>
  )
}

export function useMealPlan() {
  return useContext(MealPlanContext)
}