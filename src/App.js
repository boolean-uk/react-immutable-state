import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"


let stateHistory = []
let deleteHistory = []

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  
  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    // console.log("addNewWorkout:", newWorkout)
    setWorkouts([...workouts, newWorkout])
    
  }
 
  const deleteWorkout = (workout) => {
    // console.log("deleteWorkout:", workout)
    deleteHistory.push(workout)
    const newWorkouts = workouts.filter(item => {
      if (item !== workout) {
        // console.log(item)
        return workout
      }
    })
    setWorkouts(newWorkouts)
    

  }
  
  const completeWorkout = (workout) => {
    
    const newWorkouts = workouts.map(item => {
      if (item === workout) {
        return {
          ...item,
          done: true
        }
      } else {
        return item
      }
    })

    setWorkouts(newWorkouts)
    
  }

  

  const changeListener = (event) => {

    const restoreState = () => workouts.map(object => object)
    const doneWorkouts = workouts.filter(object => object.done === true)
    const notDone = workouts.filter(object => object.done === false)


    if (event.target.checked === true){
      setWorkouts(doneWorkouts)
      
      console.log(notDone)
      

      
      
    }
    stateHistory.push(restoreState())
    
    if (event.target.checked === false) {
      
      
      
      
      let deleteDone = stateHistory[(stateHistory.length-1) - 1].filter(function(item) {


        return !deleteHistory.includes(item)
      })

      if (notDone.length === 0){
          deleteDone = deleteDone
      } else {

        deleteDone.push(...notDone)
      }
      setWorkouts(deleteDone)
    } 
    
  }
  console.log(stateHistory, workouts, deleteHistory)
  

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>

      {/* Add a checkbox with the label "Show Done Only" to allow the user to toggle between all workouts and only workouts that are done. */}

      <div>
        <input type = "checkbox" id = "showDone" onChange = {changeListener} />
        <label htmlFor = "showDone">
          Show Done Only
        </label>
      </div>



      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={()=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={()=>deleteWorkout(workout)}>Delete</button>

            {/* Add a new button to each workout that when clicked replaces the workout with another random workout */}



          </li>
        ))}
      </ul>
      
    </div>
  )

}

export default App
