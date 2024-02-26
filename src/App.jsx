import { useState } from "react"
import { initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [filter, setFilter] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter(w => w !== workout))
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workouts)
    const newWorkouts = workouts.map(w => {
      if (w === workout) {
        return { ...w, done: true }
      }
      return w
    })
    setWorkouts(newWorkouts)
  }

  const toggleFilter = (e) => {
    const checked = e.target.checked
    setFilter(checked)
  }

  const randomizeWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const newWorkouts = workouts.map(w => {
      if (w === workout) {
        return newWorkout
      }
      return w
    })
    setWorkouts(newWorkouts)
  }


  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <div>
        <label>Filter by completed</label>
        <input type='checkbox' onChange={toggleFilter} ></input>
      </div>
      <ul>
        {
          filter ?
            workouts.filter(x => x.done).map((workout, index) => (
              <li key={index}>
                <p>
                  {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
                </p>
                {!workout.done &&
                  <button onClick={e => completeWorkout(workout)}>Done</button>}
                {workout.done &&
                  <p>✅</p>}
                <button onClick={e => deleteWorkout(workout)}>Delete</button>
                <button onClick={e => randomizeWorkout(workout)}>Randomize</button>
              </li>
            ))
            :
            workouts.map((workout, index) => (
              <li key={index}>
                <p>
                  {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
                </p>
                {!workout.done &&
                  <button onClick={e => completeWorkout(workout)}>Done</button>}
                {workout.done &&
                  <p>✅</p>}
                <button onClick={e => deleteWorkout(workout)}>Delete</button>
                <button onClick={e => randomizeWorkout(workout)}>Randomize</button>
              </li>
            ))

        }
      </ul>

    </div>
  )
}

export default App
