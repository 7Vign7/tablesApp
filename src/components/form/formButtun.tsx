import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
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
import FieldFactory from "../../utils/formUtils/fieldFactory.tsx";
import formStore from "../../stores/formStore"
import tablesStore from "../../stores/tablesStore"
import {observer} from "mobx-react-lite";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const FullScreenDialog  = observer( () =>{
    const {isOpen, openingSwitchModal, sendingTheForm} = formStore;
    const {getMim} = tablesStore
    useEffect(() => {
        getMim()
    }, []);
    return (
        <React.Fragment>
            <Button variant='contained' onClick={openingSwitchModal}>
                Добавить запись в таблицу
            </Button>
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
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Форма для записи в таблицу
                        </Typography>
                        <Button autoFocus color="inherit" onClick={sendingTheForm}>
                            <AddIcon fontSize="medium" />
                        </Button>
                    </Toolbar>
                </AppBar>
                    <DialogContent>
                        <DialogContentText>
                            Напиши тут что-то
                        </DialogContentText>
                        <FieldFactory minInput={5} maxInput={15} />
                    </DialogContent>
            </Dialog>
        </React.Fragment>
    );
});

export default FullScreenDialog;