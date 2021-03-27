import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import withStyles from "@material-ui/core/styles/withStyles";
import Backdrop from "@material-ui/core/Backdrop";
import CustomStepper from "./CustomStepper";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import '@styles/components/automation_modal.scss';

const customBackdrop = withStyles(() => ({
	root : {
		backgroundColor : "rgba(0, 0, 0, 0.9)"
	}
}))(Backdrop);

export default function SettingModal() {
		const [open, setOpen] = React.useState(false);

    const handleClose = (): void => {
      setOpen(false)
    };

    const AutoIconButton = (): JSX.Element => {
			const handleOpen = () => {
				setOpen((prev) => !prev);
			}

			return (
				<Button onClick={handleOpen} type="button">
					<AllInclusiveIcon className='auto-icon'/>
        </Button>
			)
		}

    return(
			<ClickAwayListener onClickAway={handleClose}>
				<div className='auto-button' >
					<AutoIconButton />
					<Modal
						className='modal'
						disableAutoFocus={true}
						open={open}
						BackdropComponent={customBackdrop}
						BackdropProps={{timeout: 500}} >
					<div className='paper'>
						<CustomStepper modalClose={handleClose}/>
					</div>
					</Modal>
				</div>
			</ClickAwayListener>
    )
}