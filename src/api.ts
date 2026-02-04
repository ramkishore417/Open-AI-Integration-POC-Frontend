export const getWelcomeMessage = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://fictional-fishstick-qpxvvwjgrv5h97p4-8080.app.github.dev/openai/welcome"
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.text();
  } catch (error) {
    return "Welcome! We're glad to have you here.";
  }
};
