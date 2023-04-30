/** @format */

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';
import { Player } from '../interfaces/player.interface';

interface DeleteConfirmationDialogProps {
	open: boolean;
	playerToDelete: Player | null;
	onClose: () => void;
	onDeleteConfirmed: () => void;
}

export default function DeleteConfirmationDialog({
	open,
	playerToDelete,
	onClose,
	onDeleteConfirmed,
}: DeleteConfirmationDialogProps) {
	const handleClose = () => {
		onClose();
	};

	const handleDelete = () => {
		onDeleteConfirmed();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete Player</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this player - {playerToDelete?.player}
					?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={handleDelete} color='secondary'>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
