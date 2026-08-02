import { useJsonStats } from "./useJsonStats.ts";
import { MBAPPE_NAME, HAALAND_NAME } from "../utils/Constants.ts";

type ComparisonState<TPlayer> =
    | { status: "loading" }
    | { status: "error" }
    | { status: "ready"; mbappe: TPlayer; haaland: TPlayer };


export function usePlayerComparison<TJson extends Record<string, unknown>>(key: string, url: string): ComparisonState<TJson[string]> {
    const { data, isLoading, error } = useJsonStats<TJson>(key, url);

    if (isLoading) return { status: "loading" };
    if (error || !data) return { status: "error" };

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];
    if (!mbappe || !haaland) return { status: "error" };

    return { status: "ready", mbappe, haaland };
}