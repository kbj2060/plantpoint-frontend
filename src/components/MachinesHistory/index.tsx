import React, {useEffect, useRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from "axios";
import {TablePaginationActions} from "@components/MachinesHistory/TablePaginationActions";
import getCurrentPage from "@funcUtils/getCurrentPage";
import {Errors, HttpUrls, Reports, StorageKeys} from "../../constants";
import {ResponseSwitchHistoryRead, SingleSwitchHistory} from '@interfaces/MachineHistory';
import useSubscribeSwitchStatus from "@hooks/useSubscribeSwitchStatus";
import {getReduxData} from "@funcUtils/getReduxData";
import update from "immutability-helper";
import {ReducerSwitchState} from "@redux/modules/ControlSwitch";
import { updatedDiff } from 'deep-object-diff';
import {AvailableMachines} from "@interfaces/main";
import getCurrentUser from "@funcUtils/getCurrentUser";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell : {
      root : {
        borderBottom : 'none',
      }
    }
  },
});

export function usePrevious<T>(value: T): T | undefined {
	// Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default function MachineHistory() {
	const { WordsTable } = require('@values/strings.json');
	const [ page, setPage ] = React.useState(0);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
  const [ rows, setRows ] = React.useState<SingleSwitchHistory[]>([]);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	const refresh = useSubscribeSwitchStatus();
	const prevRefresh = usePrevious(refresh);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
		setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
  };

  const handleStatus = (row: SingleSwitchHistory) => {
  		return row.status ? 'ON':'OFF'
	}

	/*const getLastSwitch =  async () => {
		const machineSection = getCurrentPage();
		await axios.get(`${HttpUrls.SWITCHES_READ}/${machineSection}/1`)
			.then(({data}) => {
				const {switchHistory}: ResponseSwitchHistoryRead = data;
				setRows(prevArray => {
						prevArray.splice(-1, 1)
						return [switchHistory[0], ...prevArray]
					});
			})
	}*/

	const getSwitchHistory = async  () => {
  	const machineSection = getCurrentPage();
  	await axios.get(`${HttpUrls.SWITCHES_READ}/${machineSection}`)
			.then(({data}) => {
				const {switchHistory}: ResponseSwitchHistoryRead = data;
				setRows(switchHistory);
			})
	}

	const TableEmptyHandler = () => {
  	const defaultHeight = 53;
  	return (
  		<>
  		{
  			emptyRows > 0 && (
						<TableRow style={{ height: defaultHeight * emptyRows }}>
						  <TableCell colSpan={6} />
						</TableRow>
					  )
  		}
			</>
		)
	}

	const CustomTableFooter = () => {
  	return(
  		<TableRow>
				<TablePagination
					className='footer'
					rowsPerPageOptions={[5]}
					colSpan={5}
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
					inputProps: { 'aria-label': 'rows per page' },
					native: true,
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableRow>
		)
	}

	useEffect(() => {
		if(!prevRefresh) { return; }
		const entries: Array<any> =
			Object.entries(updatedDiff(prevRefresh as object, refresh as object) as Record<AvailableMachines, boolean>);
		const [machine, status] = entries[0];
		const created: string = new Date().toString();
		const controlledBy = getCurrentUser();
		const switchHistory: SingleSwitchHistory = {
			machine: machine,
			status: status,
			controlledBy: controlledBy,
			created: created,
		}
		setRows(prevArray => {
			prevArray.splice(-1, 1)
			return [switchHistory, ...prevArray]
		});
		/*getLastSwitch()
			.then(() => { console.log(Reports.SWITCH_HISTORY_LOADED) })
			.catch(() => { console.log(Errors.GET_MACHINE_HISTORY_FAILURE) })*/
	}, [refresh])

	useEffect(() => {
		getSwitchHistory()
			.then(() => { console.log(Reports.SWITCH_HISTORY_LOADED) })
			.catch(() => { console.log(Errors.GET_MACHINE_HISTORY_FAILURE) })
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
							).map(( row, index ) =>
								<TableRow key={index}>
									<TableCell className='text' align="center" component="th" scope="row">
										{WordsTable[row.machine]}
									</TableCell>
									<TableCell className={row.status !== 0 ? 'status-on': 'status-off'} align="center">{handleStatus(row)}</TableCell>
									<TableCell className='text' align="center">{row.controlledBy}</TableCell>
									<TableCell className='text' align="center">{row.created}</TableCell>
								</TableRow>
							)
						}
						<TableEmptyHandler/>
					</TableBody>
					<TableFooter>
						<CustomTableFooter />
					</TableFooter>
			  </Table>
			</TableContainer>
	  </MuiThemeProvider>
	);
}