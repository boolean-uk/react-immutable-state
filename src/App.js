import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
        console.log("addNewWorkout:", newWorkout)
        setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    const newWorkout = workouts.filter(item => {
      if(item !== workout){
        return workout
      }
    })
    setWorkouts(newWorkout)
    console.log("deleteWorkout:", workout)
  }
  
 
    
    const completeWorkout = (workout) => {
    const finishedWorkout = workouts.map(item =>{
      if(item === workout){
        return {...workout, done: true
      }
    }else {
      return item
    }
    })
    console.log("completeWorkout:", workout)
    setWorkouts(finishedWorkout)
      
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
