function NewWorkout ({generateWorkout, setWorkouts, workouts}) {

    const addNewWorkout = () => {
        const newWorkout = generateWorkout()
        setWorkouts([...workouts, newWorkout])
        console.log("addNewWorkout:", newWorkout)
      }

    return (
        <>
            <button onClick={addNewWorkout}>Add New Workout</button>
        </>
    )

}

export default NewWorkout