/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
} from '@material-ui/core';

import { constants } from '../constants';
import IconButton from '@material-ui/core/IconButton';
import { Pagination } from '@material-ui/lab';
import { Player } from '../interfaces/player.interface';

import DeleteIcon from '@material-ui/icons/Delete';

const AddPlayerForm = React.lazy(() => import('../component/addPlayer'));
const DeleteConfirmationDialog = React.lazy(
	() => import('../component/deletePlayer')
);

function PlayerContainer(): JSX.Element {
	const [players, setPlayers] = useState<Player[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
	const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
	const fetchPlayers = useCallback(async () => {
		const response = await axios.get(
			`${constants.baseApiUrl}/players?count=10&page=${currentPage}`
		);
		setPlayers(response.data.data);
		setTotalPages(Math.ceil(response.data.totalPlayers / 10));
	}, [currentPage]);

	useEffect(() => {
		fetchPlayers();
	}, [fetchPlayers]);

	const handleDeletePlayer = (player: Player) => {
		setPlayerToDelete(player);
		setConfirmDialogOpen(true);
	};

	const handleConfirmDialogClose = () => {
		setConfirmDialogOpen(false);
		setPlayerToDelete(null);
	};

	const handleDeleteConfirmed = async () => {
		if (playerToDelete) {
			await axios.delete(
				`${constants.baseApiUrl}/players/${playerToDelete.id}`
			);
			setPlayerToDelete(null);
			setConfirmDialogOpen(false);
			await fetchPlayers();
		}
	};

	const handlePageChange = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setCurrentPage(value);
		},
		[]
	);

	const handleAddPlayer = (newPlayer: Partial<Player>) => {
		axios
			.post(`${constants.baseApiUrl}/players`, newPlayer)
			.then((response) => {
				setCurrentPage(1);
			});
	};

	const handleAddPlayerClick = () => {
		setShowAddPlayerForm(true);
	};

	const handleAddPlayerClose = () => {
		setShowAddPlayerForm(false);
	};
	/** @format */

	return (
		<div className='container'>
			<div className='header'>
				<Typography variant='h4' gutterBottom>
					NBA Players
				</Typography>
				<div className='button-container'>
					<Button
						variant='contained'
						color='primary'
						onClick={handleAddPlayerClick}>
						Add Player
					</Button>
				</div>
			</div>
			<div className='table-wrapper'>
				<TableContainer component={Paper} className='table-container'>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Position</TableCell>
								<TableCell>Remove </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{players.map((player) => (
								<TableRow key={player.id}>
									<TableCell>{player.id}</TableCell>
									<TableCell>{player.player}</TableCell>
									<TableCell>{player.position}</TableCell>
									<IconButton
										color='secondary'
										onClick={() => handleDeletePlayer(player)}>
										<DeleteIcon />
									</IconButton>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div className='pagination-container'>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
				/>
			</div>
			<AddPlayerForm
				open={showAddPlayerForm}
				onClose={handleAddPlayerClose}
				onAdd={handleAddPlayer}
			/>
			<DeleteConfirmationDialog
				open={confirmDialogOpen}
				playerToDelete={playerToDelete}
				onClose={handleConfirmDialogClose}
				onDeleteConfirmed={handleDeleteConfirmed}
			/>
		</div>
	);
}

const MemoizedPlayerContainer = React.memo(PlayerContainer);

export default MemoizedPlayerContainer;
