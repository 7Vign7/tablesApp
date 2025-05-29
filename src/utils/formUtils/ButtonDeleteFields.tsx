import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import formStore from '../../stores/formStore'
import type {propsFactoryComponent} from "../../types/utils.ts";
// import {observer} from "mobx-react-lite";

const ButtonDeleteFields =(props:propsFactoryComponent) => {
    const {fieldNumber} = props;
    const {fields,limitations,deleteFields} = formStore;
    if(fields.length > limitations[0]){
        return(
            <IconButton color="primary" onClick={()=>{deleteFields(fieldNumber)}}>
                <RemoveCircleIcon/>
            </IconButton>
            )
    }else{
        return null;
    }
};

export default ButtonDeleteFields;