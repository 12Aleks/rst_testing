import {Dialog, DialogTitle, DialogContent, Button} from "@mui/material";
import {memo} from "react"

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemType: "user" | "address";
    itemData: { id: number, name: string } | { user_id: number, street: string, building_number: string };
}

function DeleteModal({open, onClose, onConfirm, itemType, itemData}: DeleteModalProps) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this {itemType}?</p>
                <p className="mb-10 mt-5 text-center text-xl">
                    {itemType === "user"
                        ? `User: ${(itemData as { id: number; name: string }).name}`
                        : `Address: ${(itemData as { user_id: number; street: string; building_number: string }).street}, 
      ${(itemData as { user_id: number; street: string; building_number: string }).building_number}`}
                </p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default memo(DeleteModal);
