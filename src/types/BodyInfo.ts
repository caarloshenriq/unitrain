export type BodyInfo = {
  body_info_id?: number;
  measure_type: string;
  measurement: number; // DECIMAL(5,2) → Number no TypeScript
  measurement_date: string; // DATE → String no TypeScript (Formato ISO "YYYY-MM-DD")
  created_at?: string; // TIMESTAMP → String (Formato ISO)
};
