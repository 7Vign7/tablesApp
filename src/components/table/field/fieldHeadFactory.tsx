import {TableCell} from "@mui/material";
import tableStore from "../../../stores/tableStore.tsx";
import {observer} from "mobx-react-lite";
const CallHeadFactory =  observer(() => {
    const {maxNumberOfFields} = tableStore
    return (
        <>
            {
                Array(maxNumberOfFields).fill("").map((_, i) =>{
                        return (
                         <TableCell key={i}>{i+1}</TableCell>
                     )
                    }
                )
            }
        </>
    );
});

export default CallHeadFactory;