import tableStore from "../../../stores/tableStore.tsx";
import TableRowVign from "./tableRowVign.tsx";
import {observer} from "mobx-react-lite";
import {CircularProgress, TableRow} from "@mui/material";
import  {useRef} from "react";
import {useInfiniteScroll} from "../../../hooks/useInfiniteScroll.tsx";

const RowFactory = observer(() => {
    const {table, isLoading,getTable,notNewRow} = tableStore
    const loaderRef = useRef<HTMLDivElement | null>(null);
    useInfiniteScroll(loaderRef, getTable, [notNewRow])
    return (
        <>
            {
                table.map((row)=>{
                    return (
                        <TableRowVign key={row.id as string} rowData={row} />
                    )
                })
            }
            <TableRow component='div'  ref={loaderRef}>
                {isLoading && <CircularProgress/>}
            </TableRow>
        </>
    )
});

export default RowFactory;