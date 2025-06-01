import type {ChangeEvent} from 'react';
import {Box, TextField} from "@mui/material";
import ButtonDeleteFields from "./ButtonDeleteFields.tsx";
import type {propsFactoryComponent} from "../../../types/utils.d.ts";
import formStore from '../../../stores/formStore.tsx'

const Field = (props:propsFactoryComponent) => {
    const {fieldNumber} = props;
    const {fields,setFieldValue,errors} = formStore

    function changeInput(newField:ChangeEvent<HTMLInputElement>) {
        setFieldValue(fieldNumber, newField.target.value);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                autoFocus
                margin="dense"
                label={`Поле ${fieldNumber+1}`}
                fullWidth
                error={!!errors[fieldNumber]}
                helperText={errors[fieldNumber]}
                onChange={changeInput}
                variant="standard"
                value={fields[fieldNumber]}
            />
           <ButtonDeleteFields fieldNumber={fieldNumber} />
        </Box>
    );
};

export default Field;