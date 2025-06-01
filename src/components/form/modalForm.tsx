import React from "react";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import {DialogContent, DialogContentText,} from "@mui/material";
import FieldFactory from "./field/fieldFactory.tsx";
import formStore from "../../stores/formStore"
import {observer} from "mobx-react-lite";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ModalForm  = observer( () =>{
    const {isOpen, openingSwitchModal, sendingTheForm, isValid} = formStore;
    return (
        <React.Fragment>
            <IconButton size='medium' color='primary' onClick={openingSwitchModal}>
                <LibraryAddIcon/>
            </IconButton>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={openingSwitchModal}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={openingSwitchModal}
                            aria-label="close"
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }}  variant="h5" component="div">
                            Форма для записи в таблицу
                        </Typography>
                        <IconButton disabled={!isValid}  autoFocus color="inherit" onClick={sendingTheForm}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                    <DialogContent>
                        <DialogContentText>
                            Заполните минимум 5 полей
                        </DialogContentText>
                        <FieldFactory minInput={5} maxInput={15} />
                    </DialogContent>
            </Dialog>
        </React.Fragment>
    );
});

export default ModalForm;