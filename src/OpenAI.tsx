import React, { useEffect, useState } from "react";
import { getWelcomeMessage } from "./api";

export default function OpenAI(): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const [welcomeMessage, setWelcomeMessage] = useState("");

    useEffect(() => {
        const init = async () => {
            const message = await getWelcomeMessage();
            setWelcomeMessage(message);
            setIsLoading(false);
        };
        init();
    }, []);

    return <>{isLoading ? "Loading..." : welcomeMessage}</>;
}
