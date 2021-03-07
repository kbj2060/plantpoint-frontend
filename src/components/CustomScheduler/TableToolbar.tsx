import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {HttpUrls, Reports} from "../../constants";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import React from "react";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: '#595957',
        backgroundColor: '#D9D8D2',
      }
      : {
        color: '#595957',
        backgroundColor: '#D9D8D2',
      },
  title: {
    flex: '1 1 100%',
  },
}));

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: number[];
  removeRows: (ids: number[]) => void;
}

const EnhancedTableToolbar = (
  {numSelected, selected:selectedIds, removeRows}: EnhancedTableToolbarProps
) => {
  const classes = useToolbarStyles();

  const postRemoveSchedule = async () => {
    await axios.post(HttpUrls.SCHEDULES_DELETE, { ids : selectedIds })
  }

  const handleDeleteSchedule = () => {
    postRemoveSchedule()
      .then(() => {
        removeRows(selectedIds);
        console.log( Reports.SCHEDULES_REMOVED )
      });
  }

  const HeaderCenterDisplay = () => {
    return(
      <>
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} 선택됨
          </Typography>
        ) : (
          <Typography className={classes.title} variant="subtitle1" id="tableTitle" component="div">
            세부 일정
          </Typography>
        )}
      </>
    )
  }
  const HeaderRightDisplay = () => {
    return (
      <>
        {
          numSelected > 0 &&
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteSchedule} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
      </>
    )
  }
  return (
    <Toolbar
      className={clsx(classes.root, {[classes.highlight]: numSelected > 0,})}
      variant="dense"
    >
      <HeaderCenterDisplay />
      <HeaderRightDisplay />
    </Toolbar>
  );
};

export default React.memo(EnhancedTableToolbar);