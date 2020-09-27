import React from 'react';
import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {useDispatch, useSelector} from "react-redux";
import {getIsSignedIn} from "../../reducks/users/selectors";
import {push} from "connected-react-router";
import {HeaderMenus} from "./index";
import logo from '../../assets/img/icons/logo.png';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    menuBar: {
        backgroundColor: '#fff',
        color: '#444'
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto'
    },
    logo: {
        cursor: 'pointer'
    }
});

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <p
                        className={classes.logo}
                        onClick={() => dispatch(push('/'))}
                    >
                        EC APP
                    </p>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
