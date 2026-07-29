import { MBAPPE_COLOR, HAALAND_COLOR } from "../utils/Constants.ts";


export default function LoadingScreen() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/50 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-black px-8 py-6 shadow-lg shadow-gray-900/5">
                <div className="flex items-center gap-3">
                    <span
                        className="h-3.5 w-3.5 rounded-full animate-bounce"
                        style={{ backgroundColor: MBAPPE_COLOR, animationDelay: "0ms" }}
                    />
                    <span className="text-xs font-bold text-gray-300">VS</span>
                    <span
                        className="h-3.5 w-3.5 rounded-full animate-bounce"
                        style={{ backgroundColor: HAALAND_COLOR, animationDelay: "150ms" }}
                    />
                </div>
                <p className="text-sm font-semibold text-gray-500">Loading statistics…</p>
            </div>
        </div>
    );
}