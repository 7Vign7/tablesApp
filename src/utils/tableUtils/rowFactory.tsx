import tableStore from "../../stores/tableStore.tsx";
import TableRowVign from "./component/tableRowVign.tsx";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress} from "@mui/material";
import {useEffect, useRef} from "react";

const RowFactory = observer(() => {
    const {table, isLoading,getTable,notNewRow} = tableStore
    const loaderRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !notNewRow) {
                    console.log(1)
                    getTable();
                }
            },
            {
                threshold: 0.01 // Минимальная видимость
            }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    },[]);
    return (
        <>
            {
                table.map((row)=>{
                    return (
                        <TableRowVign key={row.id} rowData={row} />
                    )
                })
            }
            <Box ref={loaderRef} sx={{ py: 2, display: "grid", placeItems: "center"}}>
                {isLoading && <CircularProgress/>}
            </Box>
        </>
    )
});

export default RowFactory;