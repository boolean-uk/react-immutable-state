function Workout(props) {
  const handleChange = (ev) => {
    props.completeWorkout( ev.target.checked);
    console.log("propsss", ev.target.checked);
  };

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
      <form>
        <label>Show Only done</label>
        <input type="checkbox" onChange={handleChange}></input>
      </form>
    </>
  );
}

export default Workout;
