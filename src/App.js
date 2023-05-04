import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

import { Workout } from "./components";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [toggWork, setToggWork] = useState([]);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);

    setWorkouts([...workouts, newWorkout]);
    setToggWork([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout);
    const delWorkout = workouts.filter((item) => {
      if (item !== workout) {
        return workout;
      }
    });
    setWorkouts(delWorkout);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const doneWorkout = workouts.map((item) => {
      if (item === workout) {
        return {
          ...item,
          done: true,
        };
      } else {
        return item;
      }
    });
    setWorkouts(doneWorkout);
  };

  const toggleView = (e) => {
    const checked = e.target.checked;
    console.log("check", checked);
    if (checked === true) {
      const newWorkoutList = workouts.filter((item) => {
        if (item.done === true) {
          return item;
        }
      });
      setWorkouts(newWorkoutList);
    }
    if (checked === false) {
      return setWorkouts(toggWork);
    }
  };

  return (
    <div className="App">
      <Workout
        setWorkouts={setWorkouts}
        addNewWorkout={addNewWorkout}
        workouts={workouts}
        completeWorkout={completeWorkout}
        deleteWorkout={deleteWorkout}
        toggleView={toggleView}
      />
    </div>
  );
}

export default App;
