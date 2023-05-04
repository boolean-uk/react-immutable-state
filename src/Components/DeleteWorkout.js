export default function DeleteWorkout ({workout, workouts, setWorkouts}) {

    const deleteWorkout = (workout) => {
        const newState = workouts.filter((el) => {
          if (el !== workout) {
            return workout
          } else {
            return null
          }
        })
    
        setWorkouts(newState)
        
        console.log("deleteWorkout:", workout)
      }

    return (
        <>
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
        </>
    )

}
