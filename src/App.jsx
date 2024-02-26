import { useEffect, useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [doneWorkouts, setDoneWorkouts] = useState(null);
  const [showDone, setShowDone] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    const newWorkouts = workouts.filter(w => w !== workout)
    setWorkouts([...newWorkouts])
  }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(function(wo) {
      if (wo == workout) {
        return { ...workout, done: !wo.done}
      }
      return wo;
    })
    setWorkouts(updatedWorkouts)
  }

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout();
    const index = workouts.findIndex(w => w === workout)
    const newWorkouts = [...workouts.slice(0, index), newWorkout, ...workouts.slice(index+1)]
    setWorkouts([...newWorkouts])
  } 

  const handleCheckboxInput = () => {
    setShowDone(!showDone)
  }

  useEffect(() => { 

      setAllWorkouts([...workouts])
      const filtered = workouts.filter(w => w.done)
      setDoneWorkouts([...filtered])
      console.log(doneWorkouts)

      setAllWorkouts(workouts)
    
  }, [showDone, workouts ])

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <input type="checkbox" onClick={handleCheckboxInput}/>
      <label>Show done only</label>
      <br></br>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>{showDone ? doneWorkouts.map((workout, index) => 
          <li key={index}>
          <p>
            {workout.sets} sets of <strong> {workout.reps} {workout.exercise}</strong> with {workout.rest} seconds rest
          </p>
          {!workout.done &&
            <button onClick={e =>completeWorkout(workout)}>Done</button>}
          {workout.done &&
            <p>✅</p>}
          <button onClick={e =>deleteWorkout(workout)}>Delete</button>
          <button onClick={e =>replaceWorkout(workout)}>Replace</button>
        </li>

      ) : allWorkouts.map((workout, index) => (
        <li key={index}>
          <p>
            {workout.sets} sets of <strong> {workout.reps} {workout.exercise}</strong> with {workout.rest} seconds rest
          </p>
          {!workout.done &&
            <button onClick={e =>completeWorkout(workout)}>Done</button>}
          {workout.done &&
            <p>✅</p>}
          <button onClick={e =>deleteWorkout(workout)}>Delete</button>
          <button onClick={e =>replaceWorkout(workout)}>Replace</button>
        </li>
      )) }
      </ul>
    </div>
  )
}

export default App
