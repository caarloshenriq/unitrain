export type Workout = {
  workout_id: number;
  name: string;
  weekday: string;
};

export type ProgressResult = {
  workout_name: string;
  workout_date: string;
  average_weight: number;
};

export type FormattedWorkout = {
  workout_name: string;
  data: { date: string; average_weight: number }[];
};

export type ResumeWorkoutType = {
  workout_name: string;
  session_date: string;
  total_volume: number;
  total_series: number;
  distinct_exercises: number;
}