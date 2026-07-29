export default function Title({ title }: {title: string}) {
    return (
        <h1 className="text-center text-4xl font-bold tracking-tight text-emerald-600">
            {title}
        </h1>
    );
}