import {Link} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {logout} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import React, {BaseSyntheticEvent} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../../logo.jpeg';
import "../../styles/components/menu.scss";
import {DrawerDirection, PageNames, PagePaths} from "../../constants";

type LinkButtonProps = {
	to: string;
	value: string;
	icon: React.ReactNode;
	onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
};

const LinkButton = (props: LinkButtonProps) => {
	return (
		<Link to={`/${props.to}`} className='link' >
			<ListItem button key={props.value}>
				<ListItemIcon>{props.icon}</ListItemIcon>
				<ListItemText className='link-text' primary={props.value} onClick={props.onClick} />
			</ListItem>
		</Link>
	)
}

export default function Menu() {
	const [state, setState] = React.useState<boolean>(false);
	const dispatch = useDispatch();

  const openDrawer = (event: BaseSyntheticEvent) => {
		if (event && event.type === 'keydown') { return; }
		setState( true );
	}

	const closeDrawer = (event: BaseSyntheticEvent) => {
		if (event && event.type === 'keydown') { return; }
		setState( false );
	}

  const drawerList = () => (
    <div className='list' onClick={closeDrawer} onKeyDown={openDrawer} >
			<img className='logo' alt="logo" src={logo} />
      <List>
				<LinkButton icon={<LocalFloristIcon />} value={PageNames.MAIN} to={PagePaths.MAIN}  />
				<LinkButton icon={<ScheduleIcon />} value={PageNames.SCHEDULER} to={PagePaths.SCHEDULER}  />
      </List>
      <Divider />
      <List>
				<LinkButton icon={<SettingsIcon />} value={PageNames.SETTING} to={PagePaths.SETTING}  />
				<LinkButton onClick={() => dispatch(logout())} icon={<ExitToAppIcon />}
										value={PageNames.LOGOUT} to={PagePaths.LOGIN}  />
      </List>
    </div>
  );

  return (
  	<div>
			<IconButton onClick={openDrawer} type="button">
				<MenuIcon className='menu-icon' />
			</IconButton>
			<SwipeableDrawer anchor={DrawerDirection} open={state} onClose={closeDrawer} onOpen={openDrawer} >
				{drawerList()}
			</SwipeableDrawer>
		</div>
  );
}
