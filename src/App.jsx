import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    // Implementing add newWorkOut object to workouts state in an immutable way
    // long version:
    // const newWorkOuts = [...workouts]   //temp state
    // newWorkOuts.push(newWorkout)
    // setWorkouts(newWorkOuts)

    // Short version:
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)

    // Implementing delete workout:
    setWorkouts(workouts.filter(w => w !== workout))

  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)

    // Implementing completion toggle:
    // Find the workout -> if true -> COPY the workout and set the workout status for the target to the opposite (else setter det samme) -> create new state using setWorkouts
    const updatedWorkouts = workouts.map(w => w === workout ? {...w, done: !w.done} : w)

    setWorkouts(updatedWorkouts)
    
  }

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
            // 'e' stands for event! This way, we can access some attributes by forinstance, e.target...
              <button onClick={e=>completeWorkout(workout)}>Done</button>}  
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
