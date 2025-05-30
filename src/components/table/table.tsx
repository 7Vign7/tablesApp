// import React from 'react';
import {Paper, TableBody, TableContainer, TableRow, Table, TableHead} from "@mui/material";
import RowFactory from "../../utils/tableUtils/rowFactory.tsx";
import CallHeadFactory from "../../utils/tableUtils/callHeadFactory.tsx";

const TableVign = () => {
    return (
        <TableContainer component={Paper}>
           <Table sx={{'& .MuiTableCell-root': {border: '1px solid rgba(224, 224, 224, 1)'}}}>
               <TableHead>
                   <TableRow>
                       <CallHeadFactory/>
                   </TableRow>
               </TableHead>
               <TableBody>
                   <RowFactory/>
               </TableBody>
           </Table>
        </TableContainer>
    );
};

export default TableVign;