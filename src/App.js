import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";
import Workout from "./component/Workout.js";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [check, setCheck] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (deletedWorkout) => {
    const remaingWorkouts = workouts.filter(
      (workout) => workout !== deletedWorkout
    );
    setWorkouts([...remaingWorkouts]);
  };

  const completeWorkout = (completedWorkout) => {
    const completedWorkouts = workouts.map((workout) => {
      if (completedWorkout === workout) {
        workout.done = true;
      }
      return workout;
    });
    setWorkouts([...completedWorkouts]);
  };
  const hadleCheckbox = () => {
    setCheck(!check);
  };
  const randomWorkout = (oldWorkout) => {
    const newWorkouts = workouts.map((workout) => {
      if (workout === oldWorkout) {
        workout = generateWorkout();
      }
      return workout;
    });
    setWorkouts([...newWorkouts]);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <button
        className={check ? "checkbox checked" : "checkbox"}
        onClick={hadleCheckbox}
      >
        <label htmlFor="check">Show Done Only</label>
        <input checked={check} type="checkbox" name="check" />
      </button>
      <ul>
        {check ? (
          <>
            {workouts
              .filter((workout) => workout.done === true)
              .map((workout, index) => (
                <Workout
                  key={index}
                  workout={workout}
                  completeWorkout={completeWorkout}
                  deleteWorkout={deleteWorkout}
                  randomWorkout={randomWorkout}
                />
              ))}
          </>
        ) : (
          <>
            {workouts.map((workout, index) => (
              <Workout
                key={index}
                workout={workout}
                completeWorkout={completeWorkout}
                deleteWorkout={deleteWorkout}
                randomWorkout={randomWorkout}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default App;
