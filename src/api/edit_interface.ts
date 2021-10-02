export interface EditResponse {
  batchcomplete: string;
  query: {
    tokens: {
      csrftoken: string,
    }
  }
}
