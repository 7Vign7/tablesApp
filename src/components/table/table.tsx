// import React from 'react';
import {Paper, TableBody, TableContainer, TableRow, Table, TableHead, Skeleton} from "@mui/material";
import RowFactory from "../../utils/tableUtils/rowFactory.tsx";
import FieldHeadFactory from "../../utils/tableUtils/fieldHeadFactory.tsx";
import {observer} from "mobx-react-lite";
import tableStore from "../../stores/tableStore.tsx";

const TableVign = observer(() => {
    const {isLoading} = tableStore
    return (
        <>
            {
                isLoading
                    ?  <Skeleton height={860}  variant="rectangular"/>
                    :<TableContainer component={Paper}>
                        <Table sx={{'& .MuiTableCell-root': {border: '1px solid rgba(224, 224, 224, 1)'}}}>
                        <TableHead>
                            <TableRow>
                                    <FieldHeadFactory/>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                    <RowFactory/>
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
);
});

export default TableVign;