import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/jsonClient";


export function useJsonStats<T>(key: string,  url: string) {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchJson<T>(url),
        enabled: Boolean(url)
    });
}