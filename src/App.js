import { useState } from "react"
import { initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [checked, setChecked] = useState(false)

  const addNewWorkout = () => {
    setWorkouts([...workouts, generateWorkout()])
  }

  const deleteWorkout = (workout) => {
    const updatedWorkouts = workouts.filter(element => element !== workout)
    setWorkouts(updatedWorkouts)
  }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(element => {
      if (element === workout) element.done = true
      return element
    })
    setWorkouts(updatedWorkouts)
  }

  const showDoneOnly = (event) => {
    setChecked(event.target.checked)
  }

  const replaceWorkout = (workout) => {
    const updatedWorkouts = workouts.map(element => element === workout ? generateWorkout() : element)
    setWorkouts(updatedWorkouts)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label htmlFor="done-only">
        Show Done Only
        <input type="checkbox" name="done-only" id="" onChange={showDoneOnly} />
      </label>
      <ul>
        {workouts.filter(workout => checked ? workout.done === true : true)
          .map((workout, index) => (
            <li key={index}>
              <p>
                {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
              </p>
              {!workout.done &&
                <button onClick={e => completeWorkout(workout)}>Done</button>}
              {workout.done &&
                <p>✅</p>}
              <button onClick={e => deleteWorkout(workout)}>Delete</button>
              <button onClick={e => replaceWorkout(workout)}>Replace</button>
            </li>
          ))}
      </ul>

    </div>
  )
}

export default App
