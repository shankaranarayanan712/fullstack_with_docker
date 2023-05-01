/** @format */

import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
} from '@material-ui/core';
import { Player } from '../interfaces/player.interface';

interface Props {
	open: boolean;
	onClose: () => void;
	onAdd: (newPlayer: Partial<Player>) => void;
}

function AddPlayerForm({ open, onClose, onAdd }: Props): JSX.Element {
	const [formValues, setFormValues] = useState<Partial<Player>>({
		player: '',
		height: 0,
		weight: 0,
		collage: '',
		born: '',
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues((prevState: any) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onAdd(formValues);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Add Player</DialogTitle>
				<DialogContent>
					<TextField
						required
						autoFocus
						margin='dense'
						label='Player Name'
						fullWidth
						name='player'
						value={formValues.player}
						onChange={handleInputChange}
						role='textbox'
					/>
					<TextField
						required
						margin='dense'
						label='Height'
						type='number'
						fullWidth
						name='height'
						value={formValues.height}
						onChange={handleInputChange}
						role='spinbutton'
					/>
					<TextField
						required
						margin='dense'
						label='Weight'
						type='number'
						fullWidth
						name='weight'
						value={formValues.weight}
						onChange={handleInputChange}
						role='spinbutton'
					/>
					<TextField
						margin='dense'
						label='College'
						fullWidth
						name='collage'
						value={formValues.collage}
						onChange={handleInputChange}
						role='colege'
					/>
					<TextField
						required
						margin='dense'
						label='Born (year)'
						type='number'
						fullWidth
						name='born'
						value={formValues.born}
						onChange={handleInputChange}
						role='born'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color='secondary'>
						Cancel
					</Button>
					<Button type='submit' color='primary'>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default AddPlayerForm;
