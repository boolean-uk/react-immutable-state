import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
    const [workouts, setWorkouts] = useState(initialWorkouts);
    const [showDone, setShowDone] = useState(false);

    const addNewWorkout = () => {
        const newWorkout = generateWorkout();
        setWorkouts([...workouts, newWorkout]);
    };

    const deleteWorkout = (workout) =>
        setWorkouts(workouts.filter((item) => item !== workout));

    const completeWorkout = (workout) => {
        setWorkouts(
            workouts.map((item) =>
                item === workout ? { ...workout, done: !workout.done } : item
            )
        );
    };

    const generateAnotherWorkout = (workout) => {
        const newWorkout = generateWorkout();
        setWorkouts(
            workouts.map((item) =>
                item === workout ? { ...newWorkout } : item
            )
        );
    };

    return (
        <div className="App">
            <h1>🏋️‍♀️Workout Generator</h1>
            <button onClick={addNewWorkout}>Add New Workout</button>
            <label>
                <input
                    type="checkbox"
                    onChange={() => setShowDone(!showDone)}
                />
                Show only done
            </label>
            <ul>
                {workouts.map((workout, index) => {
                    if (showDone) {
                        if (workout.done) {
                            return (
                                <WorkoutItem
                                    workout={workout}
                                    key={index}
                                    deleteWorkout={deleteWorkout}
                                    completeWorkout={completeWorkout}
                                    generateAnotherWorkout={
                                        generateAnotherWorkout
                                    }
                                />
                            );
                        }
                    } else {
                        return (
                            <WorkoutItem
                                workout={workout}
                                key={index}
                                deleteWorkout={deleteWorkout}
                                completeWorkout={completeWorkout}
                                generateAnotherWorkout={generateAnotherWorkout}
                            />
                        );
                    }
                })}
            </ul>
        </div>
    );
}

const WorkoutItem = ({
    workout,
    completeWorkout,
    deleteWorkout,
    generateAnotherWorkout,
}) => {
    return (
        <li>
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
            <button onClick={() => generateAnotherWorkout(workout)}>
                Change for another
            </button>
        </li>
    );
};

export default App;
