import { useState } from "react";
import { useUsers } from "@/app/hooks/useUsers";
import UserTable from "@/components/UserTable";
import UserModal from "@/components/modals/UserModal";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {User} from "@/types/types";
import {deleteUser, updateUser} from "@/app/actions/usersActions";

const Loader = dynamic(() => import("@/components/ui/Loader"));
const ErrorMessage = dynamic(() =>  import("@/components/ui/ErrorMessage"));
const Pagination = dynamic(() => import("@/components/ui/Pagination"));

export default function UserList() {
    const [page, setPage] = useState<number>(1);
    const { data, loading, error, refetch } = useUsers(page, 10);
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = async (id: number) => {
        try {
            //await deleteUser(id);
            console.log("User has been deleted");
            refetch();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = async (id: number, updatedData: Partial<User>) => {
        try {
            console.log("Updated Data:", updatedData);
            refetch();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (error) return <ErrorMessage message={error || "Data not found!" }/>;
    if (loading) return <Loader/>;

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <Button variant="contained" onClick={() => setOpen(true)} endIcon={<AddCircleOutlineIcon />}>Create a new user</Button>
            <UserTable users={data?.users || []} onDelete={handleDelete} onSelect={handleUpdate} />
            <Pagination page={page} total={data?.quantityUsers || 0} onPageChange={setPage} />
            <UserModal open={open} onClose={() => setOpen(false)} onSuccess={refetch} />
        </div>
    );
}