import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  console.log("Workouts:",workouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    const workoutlist = [...workouts]
    workoutlist.push(newWorkout)
    console.log("Added workout:", workoutlist)
    setWorkouts(workoutlist)
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    let index = workouts.indexOf(workout)
    const keepworkouts = [...workouts]
    keepworkouts.splice(index, 1)
    console.log("keepworkouts:",keepworkouts)
    setWorkouts(keepworkouts)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    let index = workouts.indexOf(workout)
    const updateWorkouts = [...workouts]
    updateWorkouts[index].done = true
    //console.log("is it done:", updateWorkouts[index].done)
    setWorkouts(updateWorkouts)
  }
  
  const replaceWorkout = (workout) => {
    console.log("replaceWorkout:", workout)
    let index = workouts.indexOf(workout)
    const replaceWorkouts = [...workouts]
    replaceWorkouts[index] = generateWorkout()
    console.log("New workout:", replaceWorkouts[index])
    setWorkouts(replaceWorkouts)
  }

  // Select "Show Done Only":
  // Create a state for it: 
  const [show_done, setDone] = useState(false)
  // Function:
  const selectDone = (event) => {
    let status = !show_done
    console.log("Show done:",status)
    setDone(status)
  }

  // Which workouts to render:
  let show_workouts = []
  if (show_done) {
    const done_workouts = workouts.filter((workout) => (workout.done))
    show_workouts = [...done_workouts]
  } else {
    show_workouts = [...workouts]
  }

  return (
    <div className="App">
      <h1 className='header'>🏋️‍♀️Workout Generator</h1>
      <div className='top-buttons'>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <button className className={show_done ? "button-selected" : "normal button"} onClick={selectDone}>Show Done Only</button>
      </div>
      <ul>
        {show_workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={()=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={()=>deleteWorkout(workout)}>Delete</button>
            <button onClick={()=>replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App