import { AxiosError } from "axios";
import { throwError } from "./throwError";

describe("The throwError function", () => {
  test("throws error when Error is passed", () => {
    const error = new Error("Ooops");
    expect(() => throwError(error)).toThrowError("Ooops");
  });
  test("throws error when AxiosError is passed", () => {
    const axiosError = new AxiosError();
    expect(() => throwError(axiosError)).toThrowError();
  });
  test(`throws error "Something went wrong..." when string is passed`, () => {
    expect(() => throwError("Error")).toThrowError("Something went wrong...");
  });
  test(`throws error "Something went wrong..." when null is passed`, () => {
    expect(() => throwError(null)).toThrowError("Something went wrong...");
  });
  test(`throws error "Something went wrong..." when undefined is passed`, () => {
    expect(() => throwError(undefined)).toThrowError("Something went wrong...");
  });
});
