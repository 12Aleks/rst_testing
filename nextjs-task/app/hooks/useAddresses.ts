import { useEffect, useState } from "react";
import { getUserAddresses } from "@/app/actions/addressActions";
import {Address, GetUserAddressesResponse} from "@/types/types";

export const useAddresses = (userId: number, page: number, limit: number) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [quantityAddress, setQuantityAddress] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response: GetUserAddressesResponse = await getUserAddresses(userId, page, limit);
            if (!response || !response.addresses) {
                throw new Error("Invalid response structure");
            }
            setAddresses(response?.addresses);
            setQuantityAddress(response?.quantityAddress);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId, page]);

    return { addresses, quantityAddress, loading, error, refetch: fetchData };
};