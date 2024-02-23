export const initialWorkouts = [
  {
    exercise: "Hill Sprints",
    reps: 10,
    sets: 4,
    rest: 5,
    done: false,
  },
  {
    exercise: "Push Ups",
    reps: 10,
    rest: 10,
    sets: 20,
    done: false,
  },
];

const exercises = [
  "Hill Sprints",
  "Push Ups",
  "Press Ups",
  "Squat",
  "Crunches",
  "Burpees",
];

export const generateWorkout = () => {
  return {
    exercise: getRandomItem(exercises),
    reps: getRandomInRange(5, 20),
    sets: getRandomInRange(1, 5),
    rest: getRandomInRange(10, 60),
    done: false,
  };
};
export const addNewWorkout = (workouts, setWorkouts, generateWorkout) => {
  const newWorkout = generateWorkout();
  setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
};

export const deleteWorkout = (workouts, setWorkouts, workoutToDelete) => {
  setWorkouts((prevWorkouts) =>
    prevWorkouts.filter((workout) => workout !== workoutToDelete)
  );
};

export const completeWorkout = (workouts, setWorkouts, workoutToComplete) => {
  setWorkouts((prevWorkouts) =>
    prevWorkouts.map((workout) =>
      workout === workoutToComplete ? { ...workout, done: true } : workout
    )
  );
};

export const replaceWorkout = (
  workouts,
  setWorkouts,
  generateWorkout,
  workoutToReplace
) => {
  const newWorkout = generateWorkout();
  setWorkouts((prevWorkouts) =>
    prevWorkouts.map((workout) =>
      workout === workoutToReplace ? newWorkout : workout
    )
  );
};

const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
