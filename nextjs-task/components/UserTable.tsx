import {
    TableContainer,
    Table,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    TableRow,
} from "@mui/material";
import {User} from "@/types/types";
import UserItem from "@/components/UserItem";
import {memo} from "react";

interface UserTableProps {
    users: User[];
    onDelete: (id: number) => void;
    onSelect: (id: number, updatedData: Partial<User>) => void;
}


function UserTable({ users, onDelete, onSelect }: UserTableProps) {
    return (
        <TableContainer component={Paper} className="my-5 mx-auto">
            <Table sx={{ minWidth: 800 }} className="w-full">
                <TableHead className="bg-slate-400">
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>First Name</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Last Name</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Initials</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Created</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Updated</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <UserItem user={user}
                                  onDelete={onDelete}
                                  onEdit={ onSelect }
                                  key={user.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default memo(UserTable);