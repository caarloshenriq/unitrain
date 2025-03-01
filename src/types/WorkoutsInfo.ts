export type WorkoutsInfo = {
  workouts_info_id: number;
  workout_id: number;
  weight: number; // FLOAT → Number no TypeScript
  date: string; // DATE → String (Formato ISO)
  exercise_id: number;
};
