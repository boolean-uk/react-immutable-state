import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const [allWorkouts, setAllWorkouts] = useState(initialWorkouts);


  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    const newWorkouts = [...workouts]
    newWorkouts.push(newWorkout)
    console.log(newWorkout)
    setWorkouts(newWorkouts)
    setAllWorkouts(workouts)
    
  }

  const replaceWorkout= (index) => {
    const newWorkouts = [...workouts]
    newWorkouts[index] = generateWorkout()
    setWorkouts(newWorkouts)
    setAllWorkouts(workouts)
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    setWorkouts(workouts.filter(wo => wo !== workout))
    setAllWorkouts(workouts)

  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const updateWorkout = workouts.map(function(wo) {
      if(wo === workout) {
        return {...wo, done: true}
      }
      return wo
    })
    setWorkouts(updateWorkout)
    setAllWorkouts(workouts)
  }

  const filterComplete = (e) => {
    console.log("Showing all complete workouts")
    const isChecked = e.target.checked
    if (!isChecked) {
      setWorkouts(allWorkouts);
      setAllWorkouts(workouts)
    } else {
      const completedWorkouts = workouts.filter((wo) => wo.done);
      setWorkouts(completedWorkouts);
      setAllWorkouts(workouts)
    }
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <nav className="navbar">
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        <input type="checkbox" onChange={filterComplete} />
        Show Done Only
      </label>
      </nav>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>replaceWorkout(index)}>Replace</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
