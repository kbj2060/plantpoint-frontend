import React from "react";
import {useTheme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import '@styles/components/machine_history.scss';

interface TablePaginationActionsProps {
  count: number;
  onChangePage: (event: any, page: number) => void;
  page: number;
  rowsPerPage: number;
}

export function TablePaginationActions(
  {count, onChangePage, page, rowsPerPage}: TablePaginationActionsProps
) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  }

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  }

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  }

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className='machine-history-root'>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton  onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}