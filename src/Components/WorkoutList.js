import {CompleteWorkout, DeleteWorkout, Mulligan} from '.'
export default function WorkoutList({workouts, hideUnfinished, setWorkouts, generateWorkout}) {
  return(
      <ul>
        {workouts.map((workout, index) => (
          <li key={index} style={hideUnfinished ? (workout.done ? {} : {display:'none'}) : {}}>
            {console.log(workouts)}
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            <CompleteWorkout workouts={workouts} workout={workout} setWorkouts={setWorkouts} />
            <DeleteWorkout workout={workout} workouts={workouts} setWorkouts={setWorkouts}/>
            <Mulligan generateWorkout={generateWorkout} setWorkouts={setWorkouts} workout={workout} workouts={workouts} />
          </li>
        ))}
      </ul>
  )
}
