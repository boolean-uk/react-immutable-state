import React from "react";

function Workout({ workout, completeWorkout, deleteWorkout, randomWorkout }) {
  return (
    <li>
      <p>
        {workout.sets}x sets of{" "}
        <strong>
          {workout.reps}x{workout.exercise}
        </strong>{" "}
        with {workout.rest} seconds rest
      </p>
      <button onClick={(e) => randomWorkout(workout)}>Random</button>
      {!workout.done && (
        <button onClick={(e) => completeWorkout(workout)}>Done</button>
      )}
      {workout.done && <p>✅</p>}
      <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
    </li>
  );
}

export default Workout;
