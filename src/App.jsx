import { useState } from "react"
import { initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    const updatedWorkOuts = [...workouts, newWorkout]
    setWorkouts(updatedWorkOuts)
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    const updatedWorkOuts = workouts.filter((wo) = > wo !== workouts)
    setWorkouts(updatedWorkOuts)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const updatedWorkOuts = workouts.map((eachWorkOut) => {
      if (eachWorkOut === workout)
        return {
             ...workout,
             done : !workout.done
        }
      else{
        return eachWorkOut
      }
    })
    setWorkouts(updatedWorkOuts)
  }
  const workoutsToShow = showDone ? workouts.filter( wo => wo.done === true ) : workouts
  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e => completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e => deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
