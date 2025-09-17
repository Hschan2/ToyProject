export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface OpenRouterRequestBody {
  brand: string;
  tone: string;
}