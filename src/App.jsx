import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
    const [workouts, setWorkouts] = useState(initialWorkouts);
    const [showCompleted, setShowCompleted] = useState(false);

    const addNewWorkout = () => {
        const newWorkout = generateWorkout();
        console.log("addNewWorkout:", newWorkout);
        setWorkouts([...workouts, newWorkout]);
    };

    const deleteWorkout = (workout) => {
        console.log("deleteWorkout:", workout);
        setWorkouts(workouts.filter((w) => w !== workout));
    };

    const completeWorkout = (workout) => {
        console.log("completeWorkout:", workout);
        const updatedWorkouts = [...workouts];
        updatedWorkouts.forEach((element) => {
            if (element === workout) element.done = true;
        });
        setWorkouts([...updatedWorkouts]);
    };

    const checkboxChange = (event) => {
        console.log(event.target.checked);
        setShowCompleted(event.target.checked);
    };

    let workoutsToDisplay = [...workouts];
    if (showCompleted) {
        workoutsToDisplay = [...workouts.filter((w) => w.done === true)];
    }

    return (
        <div className="App">
            <h1>🏋️‍♀️Workout Generator</h1>
            <button onClick={addNewWorkout}>Add New Workout</button>
            <label>
                Show completed
                <input
                    type="checkbox"
                    id="showCompletedCheckbox"
                    value={showCompleted}
                    onChange={checkboxChange}
                />
            </label>
            <ul>
                {workoutsToDisplay.map((workout, index) => (
                    <li key={index}>
                        <p>
                            {workout.sets}x sets of{" "}
                            <strong>
                                {workout.reps}x{workout.exercise}
                            </strong>{" "}
                            with {workout.rest} seconds rest
                        </p>
                        {!workout.done && (
                            <button onClick={(e) => completeWorkout(workout)}>
                                Done
                            </button>
                        )}
                        {workout.done && <p>✅</p>}
                        <button onClick={(e) => deleteWorkout(workout)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
