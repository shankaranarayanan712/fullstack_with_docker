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
	Button,
} from '@material-ui/core';

import { constants } from '../constants';
import IconButton from '@material-ui/core/IconButton';
import { Pagination } from '@material-ui/lab';
import { Player } from '../interfaces/player.interface';
import BestTeamFinder from '../component/bestPlayers';
import DeleteIcon from '@material-ui/icons/Delete';
import useApiCache from '../helpers/apiCaching';

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
	const [showBestTeamFinder, setShowBestTeamFinder] = useState(false);
	const apiCache = useApiCache();
	const handleShowBestTeamFinder = () => {
		setShowBestTeamFinder(true);
	};

	const handleCloseBestTeamFinder = () => {
		setShowBestTeamFinder(false);
	};
	const fetchPlayers = useCallback(
		async (shouldUseCache: boolean) => {
			const response = await apiCache.get(
				`${constants.baseApiUrl}/player?count=10&page=${currentPage}`,
				shouldUseCache
			);
			setPlayers(response.data);
			setTotalPages(Math.ceil(response.totalPlayers / 10));
		},
		[apiCache, currentPage]
	);

	useEffect(() => {
		fetchPlayers(true);
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
		const shouldUseCache = false;
		if (playerToDelete) {
			await axios.delete(`${constants.baseApiUrl}/player/${playerToDelete.id}`);
			setPlayerToDelete(null);
			setConfirmDialogOpen(false);
			await fetchPlayers(shouldUseCache);
		}
	};

	const handlePageChange = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setCurrentPage(value);
		},
		[]
	);

	const handleAddPlayer = (newPlayer: Partial<Player>) => {
		axios.post(`${constants.baseApiUrl}/player`, newPlayer).then((response) => {
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
				<div className='button-container'>
					<Button
						variant='contained'
						color='primary'
						onClick={handleAddPlayerClick}>
						Add Player
					</Button>
					<Button variant='contained' onClick={handleShowBestTeamFinder}>
						Find My Best Team
					</Button>
					{showBestTeamFinder && (
						<BestTeamFinder onClose={handleCloseBestTeamFinder} />
					)}
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
								<TableCell>Born</TableCell>

								<TableCell>Height </TableCell>
								<TableCell>Weight </TableCell>
								<TableCell>Remove </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{players.map((player) => (
								<TableRow key={player.id}>
									<TableCell>{player.id}</TableCell>
									<TableCell>{player.player}</TableCell>
									<TableCell>{player.position}</TableCell>
									<TableCell>{player.born}</TableCell>
									<TableCell>{player.height}</TableCell>
									<TableCell>{player.weight}</TableCell>
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
					sx={{
						'& .MuiPaginationItem-icon': {
							color: '#ffffff', // Set the color of the pagination icons to white
						},
					}}
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					{...(Pagination as any).defaultProps}
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
