export class OllamaResponseModel{
  created_at!: string;
  done!: boolean;
  done_reason!: string;
  eval_count!: number;
  eval_duration: number = 0;
  load_duration: number = 0;
  model!: string;
  prompt_eval_count!: number;
  prompt_eval_duration: number = 0;
  response!: string;
  thinkingResponse!: string;
  total_duration: number = 0;
}
