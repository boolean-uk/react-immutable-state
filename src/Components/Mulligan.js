
export default function Mulligan ({ setWorkouts, workouts, generateWorkout, workout }) {
  const mulligan = (workout) => {
    const replacementWorkout = generateWorkout()

    const updated = workouts.map((el) => {
      if (el === workout) {
        return replacementWorkout
      }
      return el
    })

    setWorkouts(updated)
  }

  return(
    <button onClick={e=>mulligan(workout)}>Mulligan</button>
  )
}
