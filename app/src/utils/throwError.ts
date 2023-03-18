import axios from "axios";

export function throwError(err: unknown): void {
  console.log(err);
  if (axios.isAxiosError(err)) {
    throw new Error(err.response?.data.message);
  }
  if (err instanceof Error) throw err;
  throw new Error("Something went wrong...");
}
