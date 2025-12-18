"use client";

import Dropdown from "@/components/Dropdown";
import { useState, useEffect, useRef } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [agentState, setAgentState] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("user1");
    const ref = useRef();

    useEffect(() => {
        const id =
            localStorage.getItem("userId") ||
            parseInt(Math.random() * 100000000);
        localStorage.setItem("userId", `${id}`);
        setUserId(id);
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current.lastChild.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Message handler
    const handleSend = async (e) => {
        e.preventDefault();
        if (message.trim() === "") return;

        const userMessage = { role: "user", content: message };
        setMessages((prev) => [...prev, userMessage]);
        setMessage("");

        try {
            setLoading(true);
            const response = await fetch(backendUrl + "/agent/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    query: userMessage.content,
                }),
            });
            setLoading(false);

            if (!response.ok) throw new Error("Failed to fetch response");
            if (!response.body) throw new Error("No response body");
            if (response.status === 429) throw new Error("Rate limit error");

            const data = await response.json();
            setAgentState(data);
            setMessages(data.messages);
            //
        } catch (error) {
            console.error(error);
            const errorMessage = {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
            };

            setLoading(false);
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <main
            className="h-full min-h-dvh lg:min-h-[94dvh] space-y-2 w-full 
						lg:my-6 p-4 lg:rounded-md shadow-md bg-white text-sm lg:text-base"
        >
            <div className="flex flex-col h-full w-full">
                <div
                    className="w-full pt-10 lg:pt-0 overflow-y-auto h-[88dvh] min-h-[88dvh] 
					md:min-h-[85dvh] lg:min-h-[78dvh]"
                    ref={ref}
                >
                    {messages.map((message, key) => (
                        <div key={key}>
                            <p
                                className={`m-2 py-2 px-4 rounded whitespace-pre-line w-fit max-w-[90%] shadow-md
                                ${
                                    message.role === "user"
                                        ? "ml-auto bg-gray-100"
                                        : ""
                                }`}
                            >
                                {message.content}
                            </p>
                            {message.role === "user" && (
                                <Dropdown data={agentState} index={key} />
                            )}
                        </div>
                    ))}
                    <p className="text-center">
                        {loading && (
                            <svg
                                className="mx-auto size-4 animate-spin bg-black"
                                viewBox="0 0 24 24"
                            ></svg>
                        )}
                    </p>
                </div>
                <form
                    className="flex space-x-2 w-full h-fit"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        className="rounded border-2 text-sm w-full h-[2lh] px-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Start typing..."
                    />
                    <button
                        className="rounded bg-gray-900 text-white px-2 hover:bg-gray-900/90"
                        type="button"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </form>
            </div>
            <div className="flex flex-col w-1/2"></div>
        </main>
    );
}
