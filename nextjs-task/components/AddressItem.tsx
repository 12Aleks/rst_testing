import { memo, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Address } from "@/types/types";
import { getDateInPLFormat } from "@/app/lib/getData";
import DeleteModal from "@/components/modals/DeleteModal";
import EditableModal from "@/components/modals/EditModal";
import ContextMenu from "@/components/ui/ContextMenu";

interface Props {
    address: Address,
    index: number,
    onDelete: (userId: number, addressType: string, validFrom: Date) => void
    onUpdate: (id: number, updatedData: Partial<Address>) => void
}

const AddressItem = ({ address, index, onDelete,  onUpdate }: Props) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleDelete = () => {
        onDelete(address.user_id, address.address_type, address.valid_from);
        setOpenDeleteModal(false);
    };

    const handleEditSubmit = (updatedData: Partial<Address>) => {
        onUpdate(address.user_id, updatedData);
        setOpenEditModal(false);
    };

    return (
        <>
            <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{address.street}</TableCell>
                <TableCell>{address.building_number}</TableCell>
                <TableCell>{address.address_type}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.country_code}</TableCell>
                <TableCell>{address.post_code}</TableCell>
                <TableCell>{getDateInPLFormat(address.created_at)}</TableCell>
                <TableCell>{getDateInPLFormat(address.updated_at)}</TableCell>
                <TableCell>
                    <ContextMenu onDelete={() => setOpenDeleteModal(true)} onUpdate={() => setOpenEditModal(true)} />
                </TableCell>
            </TableRow>

            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDelete}
                itemType="address"
                itemData={{
                    user_id: address.user_id,
                    street: address.street,
                    building_number: address.building_number
                }}
            />


            <EditableModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                title="Edit Address"
                fields={[
                    { name: "street", label: "Street", type: "text" },
                    { name: "building_number", label: "Building Number", type: "text" },
                    { name: "address_type", label: "Address Type", type: "text" },
                    { name: "city", label: "City", type: "text" },
                    { name: "country_code", label: "Country Code", type: "text" },
                    { name: "post_code", label: "Postal Code", type: "text" },
                    { name: "valid_from", label: "Valid from", type: "datetime-local" }
                ]}
                initialData={address}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default memo(AddressItem);
