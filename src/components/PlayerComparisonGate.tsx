import type { ReactNode } from "react";
import { usePlayerComparison } from "../hooks/usePlayerComparison.ts";
import LoadingScreen from "./LoadingScreen.tsx";

interface Props<TJson extends Record<string, unknown>> {
    queryKey: string;
    url: string;
    children: (players: { mbappe: TJson[string]; haaland: TJson[string] }) => ReactNode;
}

export default function PlayerComparisonGate<TJson extends Record<string, unknown>>({queryKey, url, children}: Props<TJson>) {
    const result = usePlayerComparison<TJson>(queryKey, url);

    switch (result.status) {
        case "loading":
            return <LoadingScreen/>;

        case "error":
            return <p>Failed to load statistics.</p>;

        case "ready":
            return (
                <>
                    {children({
                        mbappe: result.mbappe,
                        haaland: result.haaland,
                    })}
                </>
            );
    }
}