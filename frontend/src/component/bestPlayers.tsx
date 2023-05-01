/** @format */

import { useState } from 'react';
import axios from 'axios';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Box,
} from '@material-ui/core';
import {
	makeStyles,
	createTheme,
	ThemeProvider,
} from '@material-ui/core/styles';

interface Player {
	id: number;
	player: string;
	games: string;
	cost: number;
	cumulative_cost: number;
}

interface BestTeamFinderProps {
	onClose: () => void;
}

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
	dialogTitle: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: theme.spacing(1),
	},
	dialogContent: {
		paddingBottom: theme.spacing(3),
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: theme.spacing(3),
	},
	formInput: {
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 650,
	},
	floatRight: {
		float: 'right',
	},
}));

const theme = createTheme({
	palette: {
		primary: {
			main: '#5C6BC0',
		},
		secondary: {
			main: '#FF7043',
		},
	},
});

export default function BestTeamFinder({ onClose }: BestTeamFinderProps) {
	const classes = useStyles();
	const [budget, setBudget] = useState<number>();
	const [players, setPlayers] = useState<Player[]>([]);

	const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBudget(Number(event.target.value));
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const response = await axios.get<Player[]>(
				`http://localhost:3008/api/player/findBestTeam/${budget}`
			);
			setPlayers(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = () => {
		setBudget(undefined);
		setPlayers([]);
		onClose();
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog open={true} onClose={handleClose} maxWidth='md' fullWidth>
				<DialogTitle className={classes.dialogTitle}>
					Find Best Team
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<Box>
						<TextField
							label='Budget'
							type='number'
							value={budget ?? ''}
							required
							onChange={handleBudgetChange}
							className={classes.formInput}
						/>
						{budget && budget > 0 && (
							<Button
								className={classes.floatRight}
								color='primary'
								onClick={handleSubmit}
								variant='outlined'>
								Submit
							</Button>
						)}
					</Box>

					{players.length > 0 ? (
						<>
							<TableContainer component={Paper}>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>Player Name</TableCell>
											<TableCell>Games</TableCell>
											<TableCell>Cost</TableCell>
											<TableCell>Cumilative Cost</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{players.map((player) => (
											<TableRow key={player.id}>
												<TableCell>{player.player}</TableCell>
												<TableCell>{player.games}</TableCell>
												<TableCell>{player.cost}</TableCell>
												<TableCell>{player.cumulative_cost}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<Button
								onClick={handleClose}
								className={classes.floatRight}
								color='secondary'>
								Close
							</Button>
						</>
					) : (
						'No team matches your budget'
					)}
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
}
