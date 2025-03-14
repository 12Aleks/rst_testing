import {Alert, Box} from "@mui/material";

interface Props {
    message: string;
}

export default function ErrorMessage({message}: Props) {
    return (
        <Box className="min-h-screen h-full flex items-center justify-center m-0 p-0">
            <Alert severity="error">{message}</Alert>
        </Box>
    )
};
