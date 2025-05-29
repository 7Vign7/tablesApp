import React from 'react';
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
import InputFactory from "../../utils/formUtils/inputFactory.tsx";
import formStore from "../../stores/formStore"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function FullScreenDialog() {
    const {isOpen, toggleModal, resetForm} = formStore;
    console.log(isOpen)
    // const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <React.Fragment>
            <Button variant='contained' onClick={toggleModal}>
                Добавить запись в таблицу
            </Button>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={resetForm}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={resetForm}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Форма для записи в таблицу
                        </Typography>
                        <Button autoFocus color="inherit" onClick={resetForm}>
                            <AddIcon fontSize="medium" />
                        </Button>
                    </Toolbar>
                </AppBar>
                {/*<List>*/}
                    {/*<ListItemButton>*/}
                    {/*    <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                    {/*</ListItemButton>*/}
                    {/*<Divider />*/}
                    {/*<ListItemButton>*/}
                    {/*    <ListItemText*/}
                    {/*        primary="Default notification ringtone"*/}
                    {/*        secondary="Tethys"*/}
                    {/*    />*/}
                    {/*</ListItemButton>*/}
                    <DialogContent>
                        <DialogContentText>
                           {/*Нужно заполнить как минимум 5 полей, также можете добавить до 15 полей и также их заполнить.*/}

                        </DialogContentText>
                        <InputFactory minInput={5} maxInput={15} />
                        {/*<TextField*/}
                        {/*    autoFocus*/}
                        {/*    required*/}
                        {/*    margin="dense"*/}
                        {/*    id="name"*/}
                        {/*    name="email"*/}
                        {/*    label="Email Address"*/}
                        {/*    type="email"*/}
                        {/*    fullWidth*/}
                        {/*    variant="standard"*/}
                        {/*/>*/}
                        {/*<TextField*/}
                        {/*    autoFocus*/}
                        {/*    required*/}
                        {/*    margin="dense"*/}
                        {/*    id="name"*/}
                        {/*    name="email"*/}
                        {/*    label="Email"*/}
                        {/*    fullWidth*/}
                        {/*    variant="standard"*/}
                        {/*/>*/}
                    </DialogContent>
                {/*</List>*/}
            </Dialog>
        </React.Fragment>
    );
}