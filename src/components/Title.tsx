interface Props {
    title: string;
    text_size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const TEXT_SIZE_MAP = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
};


export default function Title({ title, text_size = "4xl" }: Props) {
    const parts = title.split("-").map(part => part.trim());
    const hasSeparator = parts.length === 2;

    return (
        <h1 className={`p-4 text-center ${TEXT_SIZE_MAP[text_size]} font-bold tracking-tight`}>
            {hasSeparator ? (
                <>
                    <div className="text-gold-glow">{parts[0]}</div>
                    <div className="text-lg font-medium text-gray-300">{parts[1]}</div>
                </>
            ) : (
                <span className="text-gold-glow">{title}</span>
            )}
        </h1>
    );
}
