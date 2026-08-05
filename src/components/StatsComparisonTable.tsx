import type { OverallCompetitionTiersType } from "../utils/Types.ts";
import StatsBlock from "../components/StatsBlock.tsx";
import { EMPTY_OVERALL_COMPETITION_TIERS, EMPTY_STATS } from "../utils/Constants.ts";


interface Props {
    title: string;
    firstPlayer: OverallCompetitionTiersType;
    secondPlayer: OverallCompetitionTiersType;
}


/** Union of keys from both sides, in first-seen order — a tier or competition either player has appears exactly once,
 * even if only one of the two players has any data for it. Works for any keyed
 * record (competition_tiers, competitions, etc.), not just one shape. */
function mergeKeys(a?: Record<string, unknown>, b?: Record<string, unknown>): string[] {
    const keys = Object.keys(a ?? {});
    for (const key of Object.keys(b ?? {})) {
        if (!keys.includes(key)) keys.push(key);
    }
    return keys;
}


export default function StatsComparisonTable({title, firstPlayer, secondPlayer}: Props) {
    const first = firstPlayer ?? EMPTY_OVERALL_COMPETITION_TIERS;
    const second = secondPlayer ?? EMPTY_OVERALL_COMPETITION_TIERS;
    const tierNames = mergeKeys(first.competition_tiers, second.competition_tiers);

    return (
        <div className="mx-auto w-[95%] min-[900px]:w-3/5 bg-gray-800 shadow-lg">

            {/* ===== Overall — space after it, before the tiers start ===== */}
            <div className="mb-8 border-4 border-white">
                <StatsBlock title={title} firstStats={first.overall} secondStats={second.overall} />
            </div>

            {/* ===== Tiers — space_y here puts a gap BETWEEN each tier-group;
                     nothing inside a group adds any margin, so a tier's own
                     overall + its competitions stay flush against each other. ===== */}
            <div className="space-y-8">
                {tierNames.map(tierName => {
                    const firstTier = first.competition_tiers[tierName];
                    const secondTier = second.competition_tiers[tierName];
                    const compNames = mergeKeys(firstTier?.competitions, secondTier?.competitions);

                    const firstTierOverall = firstTier?.overall ?? EMPTY_STATS;
                    const secondTierOverall = secondTier?.overall ?? EMPTY_STATS;

                    // Exactly one competition contributed to this tier: showing both the tier total and that one
                    // competition's stats would just repeat the same numbers twice, so show one block with
                    // both names in the heading instead. This is itself one full group — its key sits on the
                    // outermost element, same as the multi-competition case below.
                    if (compNames.length <= 1) {
                        return (
                            <div key={tierName} className={"border-4 border-white"}>
                                <StatsBlock
                                    title={tierName + "-" + compNames[0]}
                                    firstStats={firstTierOverall}
                                    secondStats={secondTierOverall}
                                />
                            </div>
                        );
                    }

                    // More than one competition in this tier: tier total, then each competition's own stats
                    // underneath — this is what makes the card elongate. No margin/space-y anywhere in this
                    // div, so the tier-overall block and every competition sit flush, back to back.
                    return (
                        <div key={tierName} className="border-4 border-white">
                            <StatsBlock title={tierName + "-" + "Overall"} firstStats={firstTierOverall} secondStats={secondTierOverall} />

                            <div className="pl-2 pr-2">
                                {compNames.map(compName => {
                                    const firstCompStats = firstTier?.competitions[compName] ?? EMPTY_STATS;
                                    const secondCompStats = secondTier?.competitions[compName] ?? EMPTY_STATS;

                                    return (
                                        <div key={compName}>
                                            <StatsBlock title={compName} firstStats={firstCompStats} secondStats={secondCompStats} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}