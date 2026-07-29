export default function Title({ title }: {title: string}) {
    return (
        <h1 className="border-b border-gray-300 text-center text-4xl font-bold tracking-tight text-white p-4">
            {title}
        </h1>
    );
}
