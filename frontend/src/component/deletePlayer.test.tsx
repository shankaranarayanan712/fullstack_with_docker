/** @format */

import { render, fireEvent } from '@testing-library/react';
import DeleteConfirmationDialog from './deletePlayer';
import { screen } from '@testing-library/react';
import { Player } from '../interfaces/player.interface';

describe('DeleteConfirmationDialog', () => {
	const player: Player = {
		id: 1,
		player: 'John Doe',
		position: 'PG',
		height: 6.2,
		weight: 190,
		collage: 'XYZ University',
		born: '01/01/1990',
		birth_city: 'City',
		birth_state: 'State',
		year_start: '2010',
		year_end: '2022',
	};

	it('should render with the correct player name', () => {
		render(
			<DeleteConfirmationDialog
				open={true}
				playerToDelete={player}
				onClose={() => {}}
				onDeleteConfirmed={() => {}}
			/>
		);

		const playerName = screen.getByText(
			`Are you sure you want to delete this player - ${player.player}?`
		);
		expect(playerName).toBeInTheDocument();
	});

	it('should call onDeleteConfirmed when delete button is clicked', () => {
		const onDeleteConfirmed = jest.fn();
		render(
			<DeleteConfirmationDialog
				open={true}
				playerToDelete={player}
				onClose={() => {}}
				onDeleteConfirmed={onDeleteConfirmed}
			/>
		);

		const deleteButton = screen.getByText('Delete');
		fireEvent.click(deleteButton);
		expect(onDeleteConfirmed).toHaveBeenCalled();
	});

	it('should call onClose when cancel button is clicked', () => {
		const onClose = jest.fn();
		render(
			<DeleteConfirmationDialog
				open={true}
				playerToDelete={player}
				onClose={onClose}
				onDeleteConfirmed={() => {}}
			/>
		);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);
		expect(onClose).toHaveBeenCalled();
	});
});
