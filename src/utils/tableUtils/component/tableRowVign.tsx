import {TableCell, TableRow} from "@mui/material";
import type {Row} from "../../../types/table.ts";

type Propsuk = {
    key: string;
    rowData: Row;
}

const TableRowVign = (props:Propsuk) => {
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