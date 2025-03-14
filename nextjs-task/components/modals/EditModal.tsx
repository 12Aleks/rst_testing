import {memo} from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {Address, User} from "@/types/types";

interface EditableModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fields: { name: string; label: string; type: string }[];
    initialData: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
}

function EditableModal({open, onClose, title, fields, initialData, onSubmit}: EditableModalProps) {
    const { control, handleSubmit } = useForm({
        defaultValues: initialData
    });

    const handleFormSubmit = (data: Record<string, User | Address>) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, boxShadow: 24, borderRadius: 2 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {fields.map(({ name, label, type }) => {
                        if (type === "datetime-local") {
                            return (
                                <Controller
                                    key={name}
                                    name={name}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={label}
                                            type="datetime-local"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true, // Чтобы лейбл не перекрывал поле
                                            }}
                                        />
                                    )}
                                />
                            );
                        }
                        return (
                            <Controller
                                key={name}
                                name={name}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={label}
                                        type={type}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )}
                            />
                        );
                    })}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
export default memo(EditableModal);