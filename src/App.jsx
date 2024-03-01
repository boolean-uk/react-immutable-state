import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

export default function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [doneOnly, setDoneOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter((e) => e !== workout))
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    setWorkouts(workouts.map((e) => e === workout ? 
    {...e, done : !e.done} : e))
    console.log("completeWorkout:", workout)
  }

  const toggleWorkoutList = (e) => {
    console.log("toggleWorkoutList:")
    setDoneOnly(e.target.checked)
  }

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
    setWorkouts(workouts.map((e) => e === workout ? 
    { ...newWorkout } : e))
    console.log("replaceWorkout:", workout)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <p><small>
      {" "}Show Done Workouts Only
        <input 
            type="checkbox"
            onChange={toggleWorkoutList}
            checked={doneOnly}
            >
        </input>
      </small></p>
      <ul>
        {workouts.map((workout, index) => (
          (!doneOnly || workout.done) && (
            <li key={index}>
              <p>
                {workout.sets}x sets of{" "}
                <strong>
                  {workout.reps}x{workout.exercise}
                </strong>{" "}
                with {workout.rest} seconds rest
              </p>
              {!workout.done && (
                <button onClick={() => completeWorkout(workout)}>Done</button>
              )}
              {workout.done && <p>✅</p>}
              <button onClick={() => deleteWorkout(workout)}>Delete</button>
              <button onClick={() => replaceWorkout(workout)}>Replace workout</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}