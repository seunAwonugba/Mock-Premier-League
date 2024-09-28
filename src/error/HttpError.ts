import { AxiosError } from "axios";

function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
    return "isAxiosError" in error && error.isAxiosError;
}

export { isAxiosError };
