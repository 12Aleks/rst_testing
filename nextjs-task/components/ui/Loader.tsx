import {CircularProgress, Box} from "@mui/material";

export default function Loader() {
    return (<Box className="min-h-screen h-full flex items-center justify-center m-0 p-0">
        <CircularProgress/>
    </Box>)
};
