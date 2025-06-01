import formStore from '../../../stores/formStore.tsx'
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ButtonAddFields = () => {
    const {limitations, fields, addFields} = formStore
    if(limitations[1] <= fields.length) return null;
    return (
        <Box sx={{display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary"
                        onClick={addFields}
                        size="medium" >
                <AddCircleIcon fontSize='large'/>
            </IconButton>
        </Box>
    );
};

export default ButtonAddFields;