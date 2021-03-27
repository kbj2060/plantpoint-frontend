import React, {useCallback, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import {SingleSwitchHistory} from '@interfaces/MachineHistory';
import CustomTableFooter from "@components/MachinesHistory/CustomTableFooter";
import {usePrevious} from "@hooks/usePrevious";
import {currentUser} from "@funcUtils/currentUser";
import {koreanDate} from "@funcUtils/koreanDate";
import {currentPage} from "@funcUtils/currentPage";
import useSubscribeSwitches from "@hooks/useSubscribeSwitches";
import { MachineHistoryCollector, UpdatedRow } from '../../collector/Collector.class';
import { ReducerSwitchState } from '@redux/modules/ControlSwitch';

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
	
	const machineSection = currentPage();
	const rowsPerPage = 5;
	const defaultHeight = 53;
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const refresh: ReducerSwitchState = useSubscribeSwitches();
	const prevRefresh = usePrevious(refresh);

  const handleChangePage = useCallback((event: any, newPage: React.SetStateAction<number>) => {
		setPage(newPage);
  }, [])

  function handleStatus <T extends SingleSwitchHistory> (row: T) {
		return row.status ? 'ON':'OFF';
	}

	const TableEmptyHandler = () => {
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
	}

	useEffect(() => {
		if ( !prevRefresh ) { return; }
		const updatedRow: UpdatedRow | null = new MachineHistoryCollector(machineSection).extractUpdatedRows(prevRefresh, refresh);
		if ( !updatedRow ) { return; }
		updateRows( {
			machine : updatedRow!.machine,
			status: updatedRow!.status,
			controlledBy: currentUser() as string,
			created: koreanDate(),
		} as SingleSwitchHistory );
	}, [refresh, prevRefresh])

	useEffect(() => {
		new MachineHistoryCollector(machineSection).execute()
			.then( ({ data, isSucceed }) => setRows(data) )
	}, []);


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