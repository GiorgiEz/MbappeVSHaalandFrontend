import type { CareerType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsBlock from "../../components/StatsBlock.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";
import {capitalize} from "../../utils/helper_functions.ts";


export default function Career() {
    return (
        <PlayerComparisonGate<CareerType> queryKey="career" url={JSON_URLS.allTime.career}>
            {({ mbappe, haaland }) => {
                const careerGroups = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                );

                return (
                    <div className="space-y-8 w-3/5 mx-auto">
                        <Title title="All Time Career"/>

                        {careerGroups.map((group) => (
                            <StatsBlock
                                key={group}
                                title={capitalize(group)}
                                firstStats={mbappe[group]}
                                secondStats={haaland[group]}
                            />
                        ))}
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}