import tableStore from "../../stores/tableStore.tsx";
import TableRowVign from "./component/tableRowVign.tsx";
import {observer} from "mobx-react-lite";
import {CircularProgress, TableRow} from "@mui/material";
import  {useEffect, useRef} from "react";

const RowFactory = observer(() => {
    const {table, isLoading,getTable,notNewRow} = tableStore

    const loaderRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    getTable();
                }
            },
            {threshold: 0.01}
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    },[notNewRow,getTable]);

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