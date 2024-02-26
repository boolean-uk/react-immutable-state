import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [isChecked, setIsChecked] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter(workouts=>workouts !== workout))
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(w =>
      w === workout ? { ...w, done: !w.done } : w
      )
      
     setWorkouts(updatedWorkouts)
    console.log("completeWorkout:", workout)
  }

  const newRandomWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const updatedWorkouts = workouts.map(w =>
      w === workout ?newWorkout  : w
      )
      
     setWorkouts(updatedWorkouts)
    console.log("completeWorkout:", workout)
  }


  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    console.log('Checkbox status:', checked);
  };


  const filteredWorkouts = isChecked
  ? workouts.filter((workout) => workout.done)
  : workouts;

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      /> {'Show only completed'}
      <ul>
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest.
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>newRandomWorkout(workout)}>Random</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
