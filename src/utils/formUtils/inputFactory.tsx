import type {PropsInputFactory} from "../../types/utils.ts";
import {Box, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useState, ChangeEvent } from "react";

// import formStore from '../../stores/formStore'
// import type {FormType} from '../../types/form'

const InputFactory = (props:PropsInputFactory) => {
    // const {fields} = formStore;
    const [inputArray, setInputArray] = useState<string[]>( Array(5).fill(""));
    const {minInput, maxInput} = props;
    console.log(minInput, maxInput, inputArray);

    function addInput(){
        setInputArray([...inputArray, '' ]);
    }
    function deleteInput(){
        console.log(inputArray);
    }
    function changeInput(e:ChangeEvent<HTMLInputElement>){
        console.log(e.target.value);
    }

    return (
        <>
            {inputArray.map((e,i) =>{
                if(inputArray.length > minInput){
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label={`Поле ${i+1}`}
                                fullWidth
                                onChange={changeInput}
                                variant="standard"
                            />
                            <IconButton color="primary" onClick={deleteInput} >
                                <RemoveCircleIcon/>
                            </IconButton>
                        </Box>
                    )
                }
                return(
                    <TextField
                        autoFocus
                        margin="dense"
                        label={`Поле ${i+1}`}
                        onChange={changeInput}
                        fullWidth
                        variant="standard"
                    />
                )
            }
            )}
            {
                maxInput > inputArray.length?
                    <Box sx={{display: 'flex', justifyContent: 'center' }}>
                        <IconButton color="primary" onClick={addInput} size="medium" >
                            <AddCircleIcon fontSize='large'/>
                        </IconButton>
                    </Box>
                :
                    null
            }
        </>
    );
};

export default InputFactory;