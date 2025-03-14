"use client"
import { useState } from "react";
import { Button } from "@mui/material";
import AddressTable from "@/components/AddressTable";
import AddressModal from "@/components/modals/AddressModal";
import { useAddresses } from "@/app/hooks/useAddresses";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dynamic from "next/dynamic";
import Link from "next/link";
import {Address} from "@/types/types";


const Loader = dynamic(() => import("@/components/ui/Loader"));
const ErrorMessage = dynamic(() => import("@/components/ui/ErrorMessage"));
const Pagination = dynamic(() => import("@/components/ui/Pagination"));

interface UserAddressListProps {
    userId: number;
}

export default function UserAddressList({ userId }: UserAddressListProps) {
    const [page, setPage] = useState<number>(1);
    const { addresses, quantityAddress, loading, error, refetch } = useAddresses(userId, page, 2);
    const [open, setOpen] = useState<boolean>(false);


    const handleDelete = async (userId: number, addressType: string, validFrom: Date) => {
        try {
            // await deleteUserAddress(userId, addressType, validFrom);
            refetch();
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    const handleUpdate = async (userId: number,  updatedData: Partial<Address>) => {
        try {
        console.log("Updated Address Data:", updatedData);
        refetch();
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    if (error) return <ErrorMessage message={error || "Data not found!"} />;
    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <div className="flex  items-center justify-between w-full">
                <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    <Link href="/users" className="text-inherit no-underline">Return to users list</Link></Button>
                <Button variant="contained" onClick={() => setOpen(true)} endIcon={<AddCircleOutlineIcon />}>
                    Create a new address
                </Button>
            </div>

            <AddressTable addresses={addresses} onDelete={handleDelete} onUpdate={handleUpdate} />
            <Pagination page={page} total={quantityAddress || 0} onPageChange={setPage} />
            <AddressModal open={open} onClose={() => setOpen(false)} onSuccess={refetch} userId={userId} />
        </div>
    );
}
