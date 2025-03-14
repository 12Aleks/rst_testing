import { memo, useState } from 'react';
import { TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import { User } from "@/types/types";
import { getDateInPLFormat } from "@/app/lib/getData";
import DeleteModal from "@/components/modals/DeleteModal";
import EditModal from "@/components/modals/EditModal";
import ContextMenu from "@/components/ui/ContextMenu";


interface UserItemProps {
    user: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, updatedData: Partial<User>) => void;
}

const UserItem = ({ user, onDelete, onEdit  }: UserItemProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleDelete = () => {
        onDelete(user.id);
        setOpenDeleteModal(false);
    };

    const handleEditSubmit = (updatedData: Partial<User>) => {
        onEdit(user.id, updatedData);
    };

    return (
        <>
            <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{user.email}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{user.first_name}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{user.last_name}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{user.initials}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{user.status}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{getDateInPLFormat(user.created_at)}</Link></TableCell>
                <TableCell><Link href={`/user/${user.id}`}>{getDateInPLFormat(user.updated_at)}</Link></TableCell>
                <TableCell>
                    <ContextMenu onDelete={() => setOpenDeleteModal(true)} onUpdate={() => setOpenEditModal(true)} />
                </TableCell>
            </TableRow>

            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDelete}
                itemType="user"
                itemData={{ id: user.id, name: user.first_name + " " + user.last_name }}
            />

            <EditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                title="Edit User"
                fields={[
                    { name: "first_name", label: "First Name", type: "text" },
                    { name: "last_name", label: "Last Name", type: "text" },
                    { name: "initials", label: "Initials", type: "text" },
                    { name: "email", label: "Email", type: "email" }
                ]}
                initialData={user}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default memo(UserItem);
