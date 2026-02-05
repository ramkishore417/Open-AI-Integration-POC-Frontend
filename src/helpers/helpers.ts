import { generateAIResponse, readWelcomeMessage } from "../api/api";

/**
 * Extracts the welcome message from a GenericResponse object.
 * Returns the resultObj as a string, or a default message if not present.
 */
export async function getWelcomeMessage(): Promise<string> {
  const result = await readWelcomeMessage();

  return String(result.resultObj);
}

// helpers.ts
export async function getAIResponseFromPrompt(
  prompt: string,
  context?: string,
): Promise<string> {
  const finalPrompt = context
    ? `Previous response:\n${context}\n\nUser follow-up:\n${prompt}`
    : prompt;

  const result = await generateAIResponse(finalPrompt);

  if (result?.resultCode.includes("200")) {
    return result.resultObj;
  }

  throw new Error("Unable to generate response");
}
