import tableStore from "../../stores/tableStore.tsx";
import TableRowVign from "./component/tableRowVign.tsx";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress} from "@mui/material";
import {useRef} from "react";

const RowFactory = observer(() => {
    const {table, isLoading} = tableStore
    const loaderRef = useRef<HTMLDivElement>(null);
    return (
        <>
            {
                table.map((row)=>{
                    return (
                        <TableRowVign key={row.id} rowData={row} />
                    )
                })
            }
            <Box
                ref={loaderRef}
                 sx={{ py: 4, display: "grid", placeItems: "center"}}>
                {isLoading && <CircularProgress/>}
            </Box>
        </>
    )
});

export default RowFactory;