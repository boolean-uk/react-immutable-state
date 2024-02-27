import { useEffect, useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const [AllWorkouts, setAllWorkouts] = useState(workouts)

  const [doneWorkouts, setDoneWorkouts] = useState(null)

  const [showDone, setShowDone] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = [...workouts]
    newWorkout.push(generateWorkout())
    setWorkouts(newWorkout)
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    const workoutsWithoutRemoved =  workouts.filter(function(workouts) {
      return workouts !== workout
    })
    setWorkouts(workoutsWithoutRemoved)
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (target) => {
    const updatedWorkouts = workouts.map(function(workout) {
      if (workout === target) {
        return {...workout, done: !target.done}
      }
      return workout
    })
    setWorkouts(updatedWorkouts)
    console.log("completeWorkout:", target)
  }

  const swapWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const index = workouts.findIndex(e => e === workout)
    const newWorkouts = [...workouts.slice(0,index), newWorkout, ...workouts.slice(index+1)]
    setWorkouts([...newWorkouts])
  }

  const handleCheckbox = () => {
    setShowDone(!showDone)
  }

  useEffect(() => {
    setAllWorkouts([...workouts])
    const areDone = workouts.filter(e => e.done)
    setDoneWorkouts([...areDone])
    console.log(doneWorkouts)

    setAllWorkouts(workouts)
  }, [showDone, workouts])

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <input type="checkbox"onClick={handleCheckbox}/>
      <label>Show Done Only</label>
      
      <ul>
        {showDone ? doneWorkouts.map((workout, index) => 
        <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>swapWorkout(workout)}>Swap with new</button>
          </li>
      ) : AllWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>swapWorkout(workout)}>Swap with new</button>
          </li>
      ))}
      </ul>
    </div>
  )
}

export default App
