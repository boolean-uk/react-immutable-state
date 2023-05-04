export default function CompleteWorkout({ workout, workouts, setWorkouts }) {

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    console.log('workout.done', workout.done)
    const completed = workouts.map(el => {
      if (el === workout) {
        el.done = true
      } 
      return el
    })
    setWorkouts(completed)
  }

  return(
    <>
      {!workout.done && 
        <button onClick={e=>completeWorkout(workout)}>Done</button>}
      {workout.done && 
        <p>✅</p>}
    </>
  )
}
