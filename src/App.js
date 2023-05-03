import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [allWorkoutsArray, setAllWorkouts] = useState([])
  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    setAllWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    const newList = workouts.filter(item => {
      if(workout !== item){
        return item
      }
      else return
    })
    setWorkouts(newList)
    setAllWorkouts(newList)
  }

  const completeWorkout = (workout) => {
    const doneList = workouts.map(item => {
      if(item === workout) {
        return {
          ...item,
          done: true
        }
      }
      else return item
    })
    setWorkouts(doneList)
    setAllWorkouts(doneList)
  }

  const doneWorkouts = (e) => {
    const checked = e.target.checked
    console.log(checked)
    if(checked === true){
      const doneList = workouts.filter(item => {
        if(item.done === true){
          return item
        }
      })
      setWorkouts(doneList)
    }
    if(checked === false){
      return setWorkouts(allWorkoutsArray)
    } 
  }

  const randomiseItem = (workout) => {
    const randomList = workouts.map(item => {
      if(item === workout) {
        item = generateWorkout()
      }
      return item
    })
    setWorkouts(randomList)
    setAllWorkouts(randomList)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      {/* <button onClick={doneWorkouts} >Done workouts</button>
      <button onClick={allWorkouts} >All workouts</button> */}
      <label>
        Done only
        <input onChange={doneWorkouts} type="checkbox"/>
      </label>
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
             <button onClick={e=>randomiseItem(workout)}>^^^^ Randomise ^^^^</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
