import { useEffect, useState } from "react";
import { getUsers } from "@/app/actions/usersActions";
import {GetUsersResponse} from "@/types/types";

export const useUsers = (page: number, limit: number) => {
    const [data, setData] = useState<GetUsersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response: GetUsersResponse = await getUsers(page, limit);
            if ("error" in response) {
                throw new Error(response.error);
            }
            setData(response);
        } catch (error) {
            setError(error instanceof Error? error.message: "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return { data, loading, error, refetch: fetchData };
};
