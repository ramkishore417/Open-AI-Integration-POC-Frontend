import type { GenericResponse } from "../types";

export const readWelcomeMessage = async (): Promise<GenericResponse> => {
  try {
    const response = await fetch("http://localhost:8080/api/ai/welcome");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    // Return the full GenericResponse object
    return await response.json();
  } catch (error) {
    // Optionally, you can return a fallback GenericResponse here
    return {
      resultCode: "ERROR",
      resultDescription: "Failed to fetch welcome message.",
      resultObj: null,
      executionTime: 0,
    };
  }
};

export const generateAIResponse = async (
  prompt: string,
): Promise<GenericResponse> => {
  try {
    const response = await fetch("http://localhost:8080/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    // Full GenericResponse from backend
    return await response.json();
  } catch (error) {
    return {
      resultCode: "ERROR",
      resultDescription: "Failed to generate AI response.",
      resultObj: null,
      executionTime: 0,
    };
  }
};
