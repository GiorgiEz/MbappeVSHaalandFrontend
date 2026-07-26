import type { Trophy } from "../../utils/Types.ts";
import TrophyPanel from "../../components/TrophyPanel.tsx";
import { HAALAND_NAME, MBAPPE_NAME, MBAPPE_COLOR, HAALAND_COLOR } from "../../utils/Constants.ts";

interface Props {
    title: string;
    firstTrophies: Trophy[];
    secondTrophies: Trophy[];
}

export default function Awards({title, firstTrophies, secondTrophies}: Props) {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">{title}</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TrophyPanel playerName={MBAPPE_NAME} color={MBAPPE_COLOR} trophies={firstTrophies} />
                <TrophyPanel playerName={HAALAND_NAME} color={HAALAND_COLOR} trophies={secondTrophies} />
            </div>
        </div>
    );
}