import { AxiosError } from "axios";

export type ApiError = {
  message: string;
  status: number;
  data: any;
  config: any;
  request: XMLHttpRequest;
  response: any;
  isAxiosError: boolean;
};
