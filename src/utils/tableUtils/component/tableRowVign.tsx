import {TableCell, TableRow} from "@mui/material";
import type {PropsRow} from "../../../types/utils.ts";

const TableRowVign = (props:PropsRow) => {
    const {rowData} = props;
    const {fields} = rowData;
    return (
        <TableRow>
            {fields.map((cell,number) => (
                <TableCell key={number}>
                    {cell}
                </TableCell>))
            }
        </TableRow>
    );
};

export default TableRowVign;