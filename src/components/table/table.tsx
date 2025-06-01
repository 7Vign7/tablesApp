// import React from 'react';
import {Paper, TableBody, TableContainer, TableRow, Table, TableHead, TableCell} from "@mui/material";
import RowFactory from "./row/rowFactory.tsx";
import FieldHeadFactory from "./field/fieldHeadFactory.tsx";
import {observer} from "mobx-react-lite";
import ModalForm from "../form/modalForm.tsx";
import tableStore from "../../stores/tableStore.tsx";

const TableVign = observer(() => {
    const {maxNumberOfFields} = tableStore
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{'& .MuiTableCell-root': {border: '1px solid rgba(224, 224, 224, 1)'}}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='right' colSpan={maxNumberOfFields}>
                                <ModalForm/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <FieldHeadFactory/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RowFactory/>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
);
});

export default TableVign;