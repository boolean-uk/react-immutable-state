import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./workouts.js";
import "./App.css";

function App() {
	const [workouts, setWorkouts] = useState(initialWorkouts);
	const [showDoneOnly, setShowDoneOnly] = useState(false);

	const addNewWorkout = () => {
		const newWorkout = generateWorkout();
		setWorkouts([...workouts, newWorkout]);
		console.log("addNewWorkout:", newWorkout);
	};

	const deleteWorkout = (workout) => {
		const newWorkouts = workouts.filter((w) => w !== workout);
		setWorkouts(newWorkouts);
		console.log("deleteWorkout:", workout);
	};

	const completeWorkout = (workout) => {
		const newWorkouts = workouts.map((w) => {
			if (w === workout) {
				return { ...w, done: true };
			}
			return w;
		});
		setWorkouts(newWorkouts);
		console.log("completeWorkout:", workout);
	};

	const toggleShowDoneOnly = () => {
		setShowDoneOnly(!showDoneOnly);
	};

	return (
		<div className="App">
			<h1>🏋️‍♀️Workout Generator</h1>
			<button onClick={addNewWorkout}>Add New Workout</button>
			<label>
				<input
					type="checkbox"
					checked={showDoneOnly}
					onChange={toggleShowDoneOnly}
				/>
				Show Done Only
			</label>
			<ul>
				{workouts
					.filter((workout) => !showDoneOnly || workout.done)
					.map((workout, index) => (
						<li key={index}>
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
						</li>
					))}
			</ul>
		</div>
	);
}

export default App;
