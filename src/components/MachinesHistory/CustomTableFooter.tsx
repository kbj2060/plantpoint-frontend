import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import {TablePaginationActions} from "@components/MachinesHistory/TablePaginationActions";
import React from "react";

interface CustomTableFooterProps {
  rowsLength : number;
  rowsPerPage : number;
  page : number;
  handleChangePage: (event: any, newPage: React.SetStateAction<number>) => void
}

const CustomTableFooter = (
  {rowsLength, rowsPerPage, page, handleChangePage}: CustomTableFooterProps
) => {
  return(
    <TableRow>
      <TablePagination
        className='footer'
        rowsPerPageOptions={[rowsPerPage]}
        colSpan={5}
        count={rowsLength}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </TableRow>
  )
}

export default React.memo(CustomTableFooter);