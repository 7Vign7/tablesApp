import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import formStore from '../../../stores/formStore.tsx'
import type {propsFactoryComponent} from "../../../types/props.d.ts";


const ButtonDeleteFields =(props:propsFactoryComponent) => {
    const {fieldNumber} = props;
    const {fields,limitations,deleteFields} = formStore;
    if(fields.length <= limitations[0]) return null;
    return(
            <IconButton color="primary" onClick={()=>{deleteFields(fieldNumber)}}>
                <RemoveCircleIcon/>
            </IconButton>
    )
};

export default ButtonDeleteFields;