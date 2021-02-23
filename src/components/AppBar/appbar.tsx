import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '../Menu/menu';
import '../../styles/components/appbar.scss'

type AppBarProps = {
  page: string;
}

export default function PermanentAppBar(props: AppBarProps) {
  const {page} = props;

  return (
    <div className='appbar-root' >
      <AppBar position="sticky"
              className='appbar'
              elevation={0}
              color='primary'>
        <Toolbar>
          <Typography className='title' variant="h6">
            {page}
          </Typography>
          <div className='grow' />
          <div className='menu' >
            <Menu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
