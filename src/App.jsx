import { useState, useEffect } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
  const [completeOnlyCheck, setCompleteOnlyCheck] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter((w) => w !== workout))
  }

  const completeWorkout = (workout) => {
    setWorkouts(workouts.map((w) => 
      w === workout ? {...w, done: !w.done} : w
    ))
  }

  const toggleCheckMark = () => {
    setCompleteOnlyCheck(!completeOnlyCheck)
  }

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const orgWorkouts = workouts
    orgWorkouts[workouts.indexOf(workout)] = newWorkout
    setWorkouts([...orgWorkouts])
  }

  useEffect(() => {
    if (completeOnlyCheck) {
      setFilteredWorkouts(workouts.filter((w) => w.done === completeOnlyCheck))
    } else {
      setFilteredWorkouts(workouts)
    }
  }, [workouts, completeOnlyCheck])

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        <input type="checkbox" checked={completeOnlyCheck} onChange={toggleCheckMark}></input>
        Show Done Only
      </label>
      <ul>
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={() => completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={() => deleteWorkout(workout)}>Delete</button>
            <button onClick={() => replaceWorkout(workout)}>Regenerate</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
