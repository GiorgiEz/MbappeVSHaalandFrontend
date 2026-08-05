import { useJsonStats } from "./useJsonStats.ts";
import { MBAPPE_NAME, HAALAND_NAME } from "../utils/Constants.ts";

type ComparisonState<TPlayer> =
    | { status: "loading" }
    | { status: "error" }
    | { status: "ready"; mbappe: TPlayer; haaland: TPlayer };


/**
 * TPlayer is the shape of ONE player's data (e.g. OverallCompetitionTiersType,
 * Honours, CareerType, ...) — callers pass this directly, not wrapped in
 * Record<string, TPlayer>. The wrapping happens internally, against the
 * raw JSON's actual shape (keyed by player name), so callers can never
 * accidentally pass the wrong level of nesting.
 */
export function usePlayerComparison<TPlayer>(key: string, url: string): ComparisonState<TPlayer> {
    const { data, isLoading, error } = useJsonStats<Record<string, TPlayer>>(key, url);

    if (isLoading) return { status: "loading" };
    if (error || !data) return { status: "error" };

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];
    if (!mbappe || !haaland) return { status: "error" };

    return { status: "ready", mbappe, haaland };
}