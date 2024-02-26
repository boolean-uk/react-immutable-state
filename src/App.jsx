import { useState } from "react"
import {initialWorkouts, generateWorkout, addNewWorkout, deleteWorkout,
  completeWorkout,
  replaceWorkout,
  
  } from "./Workouts.js"
import "./App.css"
import WorkoutList from "./WorkoutList.jsx";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const [showDoneOnly, setShowDoneOnly] = useState(false);

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={()=>addNewWorkout(workouts, setWorkouts, generateWorkout)}>Add New Workout</button>

      <label>
        <input
          type="checkbox"
          checked={showDoneOnly}
          onChange={(e) => setShowDoneOnly(e.target.checked)}
        />
        Show Done Only
      </label>
     

      <WorkoutList
        workouts={workouts}
        showDoneOnly={showDoneOnly}
        completeWorkout={(workout) =>
          completeWorkout(workouts, setWorkouts, workout)
        }
        deleteWorkout={(workout) =>
          deleteWorkout(workouts, setWorkouts, workout)
        }
        replaceWorkout={(workout) =>
          replaceWorkout(workouts, setWorkouts, generateWorkout, workout)
        }
      />
    </div>
  )
}

export default App
