import {Button} from "@mui/material";

interface ContextMenuProps {
    onDelete: () => void;
    onUpdate: () => void;
}

export default function ContextMenu({onDelete, onUpdate}: ContextMenuProps) {

    return (
        <div className="flex items-center justify-center gap-4">
            <Button variant="contained" color="success"
                    onClick={onUpdate}
                    size="small">Edit</Button>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={onDelete}
            >
                Delete
            </Button>
        </div>
    );
}