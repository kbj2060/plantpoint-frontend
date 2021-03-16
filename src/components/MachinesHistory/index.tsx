import React, {useCallback, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import {Errors, Reports } from "../../reference/constants";
import {ResponseSwitchHistoryRead, SingleSwitchHistory} from '@interfaces/MachineHistory';
import { updatedDiff } from 'deep-object-diff';
import {ComponentState} from "@interfaces/main";
import CustomTableFooter from "@components/MachinesHistory/CustomTableFooter";
import {usePrevious} from "@hooks/usePrevious";
import {Loader} from "@compUtils/Loader";
import {currentUser} from "@funcUtils/currentUser";
import {koreanDate} from "@funcUtils/koreanDate";
import {currentPage} from "@funcUtils/currentPage";
import {changeToKoreanDate} from "@funcUtils/changeToKoreanDate";
import useSubscribeSwitches from "@hooks/useSubscribeSwitches";
import {getHistorySwitches} from "../../handler/httpHandler";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell : {
      root : {
        borderBottom : 'none',
      }
    }
  },
});

export default function MachineHistory() {
	const { Translations } = require('@values/translations');
	const [ page, setPage ] = React.useState<number>(0);
  const [ rows, setRows ] = React.useState<SingleSwitchHistory[]>([]);
	const [ state, setState ] = React.useState<ComponentState>({
		isLoaded : false,
		error: null,
	});
	const rowsPerPage = 5;
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	const refresh = useSubscribeSwitches();
	const prevRefresh = usePrevious(refresh);

  const handleChangePage = useCallback((event: any, newPage: React.SetStateAction<number>) => {
		setPage(newPage);
  }, [])

  function handleStatus <T extends SingleSwitchHistory> (row: T) {
  		return row.status ? 'ON':'OFF';
	}

	const TableEmptyHandler = () => {
  	const defaultHeight = 53;
  	return (
  		<>
  		{emptyRows > 0 && (
						<TableRow style={{ height: defaultHeight * emptyRows }}>
						  <TableCell colSpan={6} />
						</TableRow> ) }
			</>
		)
	}

	function updateRows<T extends SingleSwitchHistory>(switchHistory: T) {
		setRows(prevArray => {
			prevArray.splice(-1, 1)
			return [switchHistory, ...prevArray]
		});
		setState(state => ({
			...state,
			isLoaded: true,
		}));
	}

	useEffect(() => {
		if ( !prevRefresh ) { return; }
		const entries: Array<any> = Object.entries(
			updatedDiff(prevRefresh as object, refresh as object) as Record<string, boolean>
		);
		if ( entries.length !== 1 ) { return; }
		const [machine, status] = entries.flat();
		updateRows( {
			machine : machine,
			status: status,
			controlledBy: currentUser() as string,
			created: koreanDate(),
		} as SingleSwitchHistory );
	}, [refresh, prevRefresh])

	useEffect(() => {
		const handleDateLocale = (sw: SingleSwitchHistory) => {
			sw.created = changeToKoreanDate(sw.created);
			return sw;
		}

		const getSwitchHistory = async  () => {
			const machineSection = currentPage();
			getHistorySwitches(machineSection)
				.then(
					({data}) => {
						const { switchHistory }: ResponseSwitchHistoryRead = data;
						setRows(() => (switchHistory.map(handleDateLocale)));
						setState(state => ({
							...state,
							isLoaded: true,
						}));
					},
					(error) => {
						setState(() => ({
							isLoaded: true,
							error
						}));
					}
				)
		}

		getSwitchHistory()
			.then( () => { console.log(Reports.SWITCH_HISTORY_LOADED) } )
			.catch( () => { console.log(Errors.GET_MACHINE_HISTORY_FAILURE) } )
	}, []);

	if (state.error) {
		return <Loader />;
	} else if (!state.isLoaded) {
		return <Loader />;
	} else {
		return (
			<MuiThemeProvider theme={theme}>
				<TableContainer component={Paper} className='container'>
					<Table className='table' aria-label="custom pagination table">
						<TableBody>
							{
								(rowsPerPage > 0
										? Array.from(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
										: Array.from(rows)
								).map((row, index) =>
									<TableRow key={index}>
										<TableCell className='text' align="center" component="th" scope="row">
											{Translations[row.machine]}
										</TableCell>
										<TableCell className={row.status !== 0 ? 'status-on' : 'status-off'}
															 align="center">{handleStatus(row)}</TableCell>
										<TableCell className='text' align="center">{row.controlledBy}</TableCell>
										<TableCell className='text' align="center">{row.created}</TableCell>
									</TableRow>
								)
							}
							<TableEmptyHandler/>
						</TableBody>
						<TableFooter>
							<CustomTableFooter
								rowsLength={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								handleChangePage={handleChangePage}/>
						</TableFooter>
					</Table>
				</TableContainer>
			</MuiThemeProvider>
		);
	}
}