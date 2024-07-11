import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Button, Zoom } from "@mui/material";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  btnTitle: string;
  component: React.ReactNode;
};

const DynamicModal = ({ open, setOpen, title, btnTitle, component }: Props) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });
  //   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        className="bg-transparent"
        fullWidth
        open={open}
        TransitionComponent={Zoom}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{component}</DialogContent>
        <DialogActions>
          <Button>{btnTitle}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DynamicModal;
