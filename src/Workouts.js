export const initialWorkouts = [
  {
    exercise: "Hill Sprints",
    reps: 10,
    sets: 4,
    rest: 5,
    done: false
  },
  {
    exercise: "Push Ups",
    reps: 10,
    rest: 10,
    sets: 20,
    done: false
  },
]

const exercises = [
  'Hill Sprints',
  'Push Ups',
  'Press Ups',
  'Squat',
  'Crunches',
  'Burpees',
]

export const generateWorkout = () => {
  return {
    exercise: getRandomItem(exercises),
    reps: getRandomInRange(5, 20),
    sets: getRandomInRange(1, 5),
    rest: getRandomInRange(10, 60),
    done: false,
  }
}

const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)]
}

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

