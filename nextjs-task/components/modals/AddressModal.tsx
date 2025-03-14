import { memo, useState, useEffect } from "react";
import {Dialog, DialogTitle, DialogContent, TextField, Button, Box, MenuItem} from "@mui/material";
import { createUserAddress } from "@/app/actions/addressActions";
import { z } from "zod";
import { addressSchema } from "@/app/lib/zoodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddressModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    userId: number;
}

export type addressSchemaType = z.infer<typeof addressSchema>;

function AddressModal({ open, onClose, onSuccess, userId }: AddressModalProps) {
    const [preview, setPreview] = useState({
        street: "",
        building_number: "",
        post_code: "",
        city: "",
        country_code: ""
    });

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<addressSchemaType>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            street: "",
            building_number: "",
            post_code: "",
            city: "",
            country_code: "",
            address_type: "HOME"
        },
    });


    const [street, building_number, post_code, city, country_code] = watch([
        "street",
        "building_number",
        "post_code",
        "city",
        "country_code",
    ]);
    useEffect(() => {
        setPreview({
            street: street || "",
            building_number: building_number || "",
            post_code: post_code || "",
            city: city || "",
            country_code: country_code || "",
        });
    }, [street, building_number, post_code, city, country_code]);

    const onSubmit = async (data: addressSchemaType) => {
        try {
            const response = await createUserAddress(data, userId, new Date());
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error creating address:", error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create new address</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Street"
                        fullWidth
                        {...register("street")}
                        error={!!errors.street}
                        helperText={errors.street?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Building Number"
                        fullWidth
                        {...register("building_number")}
                        error={!!errors.building_number}
                        helperText={errors.building_number?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Post Code"
                        fullWidth
                        {...register("post_code")}
                        error={!!errors.post_code}
                        helperText={errors.post_code?.message}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Country Code"
                        fullWidth
                        {...register("country_code")}
                        error={!!errors.country_code}
                        helperText={errors.country_code?.message}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Address Type"
                        value={watch("address_type")}
                        fullWidth
                        {...register("address_type")}
                        error={!!errors.address_type}
                        helperText={errors.address_type?.message}
                    >
                        <MenuItem value="HOME">HOME</MenuItem>
                        <MenuItem value="WORK">WORK</MenuItem>
                    </TextField>

                    <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                        <strong>Address Preview:</strong>
                        <p>
                            {preview.street} {preview.building_number}
                            <br />
                            {preview.post_code} {preview.city}
                            <br />
                            {preview.country_code}
                        </p>
                    </Box>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 3, maxWidth: "70%", width: "100%", paddingTop: "10px" }}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default memo(AddressModal);
