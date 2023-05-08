import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showCompleted, setShowCompleted] = useState(false);



  const addNewWorkout = () => {
    const newWorkout = generateWorkout();

    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    console.log("deleted", workout);
    const itemsToKeep = workouts.filter((item) => {
      return item !== workout;
    });
    setWorkouts(itemsToKeep);
  };

  const newRandomWorkout = (workout) => {
    console.log('we want a new', workout);
    const itemToUpdate = workouts.map((item) => {
      if (item === workout) {
        return generateWorkout();
      } else {
        return item;
      }
    });
    setWorkouts(itemToUpdate);

  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const itemCompleted = workouts.map((item) => {
      if (item === workout) {
        return { ...item, done: true };
      }
      return item;
    });
    setWorkouts(itemCompleted);
  };

  const handleToggle = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredWorkouts = showCompleted
    ? workouts.filter((workout) => workout.done)
    : workouts;

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <br></br>
      <br></br>
      <label htmlFor="">
        Show Done Only
        <input 
        type="checkbox" 
        checked={showCompleted}
        onChange={handleToggle}/>
      </label>

      <ul>
        {filteredWorkouts.map((workout, index) => (
        
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
            <button onClick={(e) => newRandomWorkout(workout)}>New</button>
          </li> 
          
        ))}
      </ul>
    </div>
  );
}

export default App;
