import { BodyInfo } from "./BodyInfo";
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";
import { WorkoutExercise } from "./WorkoutExercise";
import { WorkoutsInfo } from "./WorkoutsInfo";

export type BackupTables = {
  workouts: Workout[];
  exercise: Exercise[];
  workout_exercise: WorkoutExercise[];
  body_info: BodyInfo[];
  workouts_info: WorkoutsInfo[];
};
