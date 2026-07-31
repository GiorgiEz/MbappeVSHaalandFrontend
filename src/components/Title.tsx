import { TITLE_COLOR } from "../utils/Constants.ts";

export default function Title({ title }: { title: string }) {
    return (
        <h1
            className="border-b border-gray-300 p-4 text-center text-4xl font-bold tracking-tight"
            style={{ color: TITLE_COLOR }}
        >
            {title}
        </h1>
    );
}