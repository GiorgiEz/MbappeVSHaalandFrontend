import type { ReactNode } from "react";
import { usePlayerComparison } from "../hooks/usePlayerComparison.ts";
import LoadingScreen from "./LoadingScreen.tsx";

interface Props<TPlayer> {
    queryKey: string;
    url: string;
    children: (players: { mbappe: TPlayer; haaland: TPlayer }) => ReactNode;
}

export default function PlayerComparisonGate<TPlayer>({queryKey, url, children}: Props<TPlayer>) {
    const result = usePlayerComparison<TPlayer>(queryKey, url);

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