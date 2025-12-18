import React from "react";

export default function Dropdown({ data, index }) {
    return (
        <div className="text-sm">
            <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
                <summary className="flex w-fit ml-auto mr-2 cursor-pointer items-center justify-between gap-4 rounded border border-gray-200 bg-white px-1 py-1 font-medium text-gray-900 hover:bg-gray-50">
                    <svg
                        className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 ml-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </summary>

                <div className="p-4 flex flex-wrap gap-6 bg-white shadow-md mr-10 pl-8 ml-0.5 mt-2">
                    <div>
                        <b>Memory:</b>
                        <pre className="whitespace-pre">
                            {JSON.stringify(
                                data && data.memory && data.memory[index / 2],
                                null,
                                2
                            )}
                        </pre>
                    </div>
                    <div>
                        <b>Emotional State:</b>
                        <pre className="whitespace-pre">
                            {JSON.stringify(
                                data &&
                                    data.personality_analysis &&
                                    data.personality_analysis[index / 2] &&
                                    data.personality_analysis[index / 2]
                                        .emotional_state,
                                null,
                                2
                            )}
                        </pre>
                    </div>
                    <div>
                        <b>Emotion:</b>
                        <pre className="whitespace-pre">
                            {JSON.stringify(
                                data && data.emotion && data.emotion[index / 2],
                                null,
                                2
                            )}
                        </pre>
                    </div>
                    <div>
                        <b>
                            AI response personality:{" "}
                            {data &&
                                data.personality_analysis &&
                                data.personality_analysis[index / 2] &&
                                data.personality_analysis[index / 2]
                                    .selected_personality}
                        </b>
                        <pre className="whitespace-pre">
                            {JSON.stringify(
                                data &&
                                    data.personality_analysis &&
                                    data.personality_analysis[index / 2] &&
                                    data.personality_analysis[index / 2]
                                        .personality,
                                null,
                                2
                            )}
                        </pre>
                    </div>
                </div>
            </details>
        </div>
    );
}
