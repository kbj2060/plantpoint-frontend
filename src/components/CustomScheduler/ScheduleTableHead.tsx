import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, {BaseSyntheticEvent} from "react";

const headCells = [
  { id: 'date', numeric: true, disablePadding: false, label: '날짜' },
  { id: 'title', numeric: true, disablePadding: false, label: '제목' },
  { id: 'binding', numeric: true, disablePadding: false, label: '중복' },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: <T extends BaseSyntheticEvent, U>(e: T, property: U) => void;
  onSelectAllClick: <T extends BaseSyntheticEvent>(e: T) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  }: EnhancedTableHeadProps ) {
  const createSortHandler = (property: string) => (event: BaseSyntheticEvent) => {
    onRequestSort(event, property);
  };

  const CheckBoxHeader = () => {
    return(
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          style ={{color :"#595957"}}
          inputProps={{ 'aria-label': 'select all desserts' }}
        />
      </TableCell>
    )
  }

  const ColumnNameHeader = () => {
    return(
      <>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <span className='visually_hidden' >
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                  </span>)
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <CheckBoxHeader />
        <ColumnNameHeader />
      </TableRow>
    </TableHead>
  );
}

export default React.memo(EnhancedTableHead);