// import React, {ChangeEvent} from 'react';
import {Box, TextField} from "@mui/material";
import ButtonDeleteFields from "./ButtonDeleteFields.tsx";
import type {propsFactoryComponent} from "../../../types/utils.ts";
import formStore from '../../../stores/formStore.tsx'

const Field = (props:propsFactoryComponent) => {
    const {fieldNumber} = props;
    const {fields,setFieldValue,errors} = formStore
    // function test(i){
    //     setFieldValue(fieldNumber,i.target.value);
    //     // validateField(fieldNumber)
    //     console.log(errors);
    // }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                autoFocus
                margin="dense"
                label={`Поле ${fieldNumber+1}`}
                fullWidth
                onChange={test}
                variant="standard"
                value={fields[fieldNumber]}
            />
           <ButtonDeleteFields fieldNumber={fieldNumber} />
        </Box>
    );
};

export default Field;