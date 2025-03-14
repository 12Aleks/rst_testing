import {Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem} from "@mui/material";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {userSchema} from "@/app/lib/zoodSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {memo} from "react";
import {createNewUser} from "@/app/actions/usersActions";

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export type userSchemaType = z.infer<typeof userSchema>;

function UserModal({open, onClose, onSuccess}: UserModalProps) {
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm<userSchemaType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            initials: "",
            email: "",
            status: "ACTIVE",
        },
    });

    const onSubmit = async (data: userSchemaType) => {
        try {
            await createNewUser(data);
            onSuccess();
            reset();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        reset();
        onClose()
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent >
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="dense"
                        label="First Name"
                        fullWidth
                        {...register("first_name")}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        {...register("last_name")}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Initials"
                        fullWidth
                        {...register("initials")}
                        error={!!errors.initials}
                        helperText={errors.initials?.message}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Status"
                        value={watch("status")}
                        fullWidth
                        {...register("status")}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                    >
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </TextField>
                    <Button className="mt-10" variant="contained" size="small" type="submit"
                            sx={{
                                marginTop: 3,
                                maxWidth: '70%',
                                width: '100%',
                                paddingTop: '10px',
                            }}
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default memo(UserModal);