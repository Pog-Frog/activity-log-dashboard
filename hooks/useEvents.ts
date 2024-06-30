import useSWR from "swr";
import axios from "axios";


export const useEvents = (page: number, pageSize: number, searchQuery?: string, filterType?: string) => {
    const { data, error, mutate } = useSWR<Event[]>(
        `/api/events?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery || ""}`,
        async (url: string) => {
            const response = await axios.get(url);
            return response.data;
        }
    );

    return {
        events: data,
        error,
        isLoading: !data && !error,
        mutate
    };
};
