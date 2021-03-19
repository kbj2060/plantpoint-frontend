import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '../Menu/Menu';
import '@styles/components/appbar.scss'

interface AppBarProps {
  page: string;
}

export default function PermanentAppBar(props: AppBarProps) {
  const {page} = props;
  const {Translations} = require('@values/translations');

  return (
    <div className='appbar-root' >
      <AppBar position="sticky"
              className='appbar'
              elevation={0}
              color='primary'>
        <Toolbar>
          <Typography className='title' variant="h6">
            {Translations[page]}
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
