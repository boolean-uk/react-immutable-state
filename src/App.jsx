import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [oldWorkouts, setOldWorkouts] = useState(initialWorkouts);
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showState, setShow] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);
    setWorkouts([...workouts, newWorkout]);
    setOldWorkouts([...workouts, newWorkout]);
  };

  const randomizeWorkout = (workout) => {
    const newWorkout = generateWorkout();
    const updated = { ...workout, ...newWorkout };
    // there is no workout id
    const updatedArray = workouts.map((w) => {
      if (
        w.exercise === workout.exercise &&
        w.reps === workout.reps &&
        w.sets === workout.sets &&
        w.rest === workout.rest
      ) {
        return updated;
      } else {
        return w;
      }
    });
    setWorkouts([...updatedArray]);
  };

  const deleteWorkout = (workout) => {
    var filter = {
      exercise: workout.exercise,
      sets: workout.sets,
      reps: workout.reps,
      rest: workout.rest,
    };

    const updated = workouts.filter(function (wk) {
      for (var key in filter) {
        if (wk[key] != filter[key]) return true;
      }
      return false;
    });
    setWorkouts(updated);
  };

  const completeWorkout = (workout) => {
    const updated = { ...workout, done: !workout.done };

    // there is no workout id
    const updatedArray = workouts.map((w) => {
      if (
        w.exercise === workout.exercise &&
        w.reps === workout.reps &&
        w.sets === workout.sets &&
        w.rest === workout.rest
      ) {
        return updated;
      } else {
        return w;
      }
    });
    setWorkouts([...updatedArray]);
  };

  const handleDone = (event) => {
    const { value } = event.target;

    const val = value === "false" ? false : true;
    setShow(!val);

    console.log("input: ", value, "changed: ", val, "newState: ", showState);

    if (val === false) {
      console.log("done filter applied!");
      const updatedArray = workouts.filter((w) => {
        if (w.done === !showState) return w;
      });

      setWorkouts([...updatedArray]);
    } else {
      console.log("no done filter");
      setWorkouts([...oldWorkouts]);
    }
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        Show done:{" "}
        <input type="checkbox" value={showState} onChange={handleDone} />
      </label>
      <ul>
        {workouts.map((workout, index) => (
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
            <button onClick={(e) => randomizeWorkout(workout)}>
              Randomize
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
