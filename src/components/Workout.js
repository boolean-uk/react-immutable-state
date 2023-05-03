import { useState } from "react";

function Workout(props) {
  return (
    <>
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={props.addNewWorkout}>Add New Workout</button>
      <ul>
        {props.workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => props.completeWorkout(workout)}>
                Done
              </button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => props.deleteWorkout(workout)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Workout;
