import React, {useCallback, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ScheduleDetail from "./ScheduleDetail.tsx";
import axios from "axios";
import moment from "moment";
import {shallowEqual, useSelector} from "react-redux";
import {HttpUrls} from "../../constants";
import '@styles/components/date_picker.scss';
import EnhancedTableHead from "@components/CustomScheduler/ScheduleTableHead";
import EnhancedTableToolbar from "@components/CustomScheduler/TableToolbar";
import '@styles/components/schedule_table.scss'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function ScheduleTable({selectedDay}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([])
  const rowsPerPage = 5;
  const [selectedRow, setSelectedRow] = React.useState({})
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [drawer, setDrawer] = React.useState(false);
  const date = useSelector(state => state['date'], shallowEqual)

  //console.log(date, drawer, isLoading, selectedRow, rows, rowsPerPage, page, selected, order, orderBy);
  const toggleDrawer = useCallback(() => {
    setDrawer(!drawer);
  }, [drawer]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const removeRows = useCallback((ids) => {
    setRows(rows.filter((row) => !ids.includes(row.id)))
  }, [rows]);

  const updateRow = ({id, date, title, content, binding}) => {
    setRows(rows.map((row) => id === row.id ? {id, date, title, content, binding} : row))
  }

  const datePadding = (date) => {
    return date.toString().padStart(2,'0')
  }

  const cleanup = () => {
    setRows([]);
    setPage(0)
    setSelected([])
    setIsLoaded(false);
  }

  useEffect(() => {
    const getDaySchedule = async () => {
      const sDate = `${selectedDay.year}-${datePadding(selectedDay.month)}-${datePadding(selectedDay.day)}`
      await axios.get(`${HttpUrls.SCHEDULES_READ}/${sDate}`)
        .then(({data}) => {
          const {SelectedDateSchedules} = data;
          setRows(SelectedDateSchedules);
          setIsLoaded(true);
        })
    }

    const getMonthSchedule = async () => {
      const sDate = `${date.year}-${datePadding(date.month)}`
      await axios.get(`${HttpUrls.SCHEDULES_READ}/${sDate}`)
        .then(({data}) => {
          const {SelectedDateSchedules} = data;
          console.log(SelectedDateSchedules)
          setRows(SelectedDateSchedules);
          setIsLoaded(true);
        })
    }

    selectedDay
      ? getDaySchedule()
      : getMonthSchedule();
    return () => { cleanup();}
  }, [selectedDay, date])

  const TableContent = () => {
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const handleMomentFormat = (date) => {
      return moment(new Date(date.year, date.month-1, date.day)).format("YYYY-MM-DD")
    }

    const handleRowClick = (event, row) => {
      toggleDrawer();
      setSelectedRow(row);
    }

    const handleCheckboxClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };

    return (
      <>
      {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      classes={{
                        root : 'root'}}
                    >
                      <TableCell  padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleCheckboxClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          style ={{color :"#595957"}}
                        />
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">
                        {selectedDay
                          ? handleMomentFormat(selectedDay)
                          : row.date[0]}
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">
                        <div className={'text-container'}>
                          {row.title}
                        </div>
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">{!row.binding?'':row.binding+'회'}</TableCell>
                    </TableRow>
                  );
                })}
      </>
    )
  }

  const TableEmptyHandler = () => {
    const defaultHeight = 53
    return (
      <>
      {emptyRows > 0 && (
                <TableRow style={{ height:  defaultHeight * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
      </>
    )
  }

  const DrawerHandler = () => {
    return (
      <>
      {
      drawer &&
        <ScheduleDetail
            toggleDrawer={toggleDrawer}
            selectedRow={selectedRow}
            updateRow={updateRow} />}
      </>
    )
  }

  return (
    isLoaded
      ? <div className='table-wrapper' >
          <Paper className='table-paper'>
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              removeRows={removeRows} />
            <TableContainer>
              <Table
                className='table'
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  <TableContent />
                  <TableEmptyHandler />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
            <DrawerHandler />
          </Paper>
        </div>
      : <></>
  );
}
