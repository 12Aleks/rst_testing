import {memo} from "react";
import { TableContainer, Table, TableBody, Paper, TableHead, TableRow, TableCell } from "@mui/material";
import AddressItem from "@/components/AddressItem";
import { Address } from "@/types/types";

interface AddressTableProps {
    addresses: Address[];
    onDelete: (userId: number, addressType: string, validFrom: Date) => void;
    onUpdate: (id: number, updatedData: Partial<Address>) => void;
}

function AddressTable({ addresses, onDelete, onUpdate }: AddressTableProps) {
    return (
        <TableContainer component={Paper} className="my-5 mx-auto">
            <Table sx={{ minWidth: 800 }} className="w-full">
                <TableHead className="bg-slate-400">
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Street</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Building number</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Address Type</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Country code</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>City</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Post code</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Created</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Updated</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addresses?.map((address, index) => (
                        <AddressItem
                            key={`address-${index}`}
                            address={address}
                            index={index}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default memo(AddressTable);