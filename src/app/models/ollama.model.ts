export class OllamaModel {
  name!: string;
  model!: string;
  digest!: string;
  size!: number;
  modified_at!: string;
  details!: OllamaModelDetails;
}

export class OllamaModelDetails {
  family!: string;
  families!: string[];
  format!: string;
  parameter_size!: string;
  parent_model!: string;
  quantization_level!: string;
}
