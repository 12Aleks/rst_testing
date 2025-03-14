import { Pagination as MuiPagination } from "@mui/material";

interface Props {
    page: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, total, onPageChange }: Props) => {
    const totalPages = Math.ceil(total / 10);

    return (
        <MuiPagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => onPageChange(newPage)}
            color="standard"
            className="mt-auto mb-5"
        />
    );
};

export default Pagination;
