import { Response } from "express";

export async function handleControllerError(
  res: Response,
  err: Error | unknown,
  message: string
) {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: message });
  }
}
