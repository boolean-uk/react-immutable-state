

function MyNewWorkout ({workout, completeWorkout, deleteWorkout, index, updatedWorkout}) { 
    return (

<li key={index}>
<p>
  {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
</p>
{!workout.done && 
  <button onClick={e=>completeWorkout(workout)}>Done</button>}
{workout.done && 
 <p>✅</p>}
<button onClick={e=>deleteWorkout(workout)}>Delete</button>
<button onClick={e=>updatedWorkout(workout)}>New</button>
</li>

    )

}

export default MyNewWorkout