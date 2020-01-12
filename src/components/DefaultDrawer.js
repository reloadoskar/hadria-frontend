import React, {useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import { IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Collapse, Tooltip } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BallotIcon from '@material-ui/icons/Ballot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import TocIcon from '@material-ui/icons/Toc';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import GroupIcon from '@material-ui/icons/Group';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
import StoreIcon from '@material-ui/icons/Store';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ReceiptIcon from '@material-ui/icons/Receipt';

const drawerWidth = 240;
const StyledTooltip = withStyles(theme => ({
    tooltip: {
        background: 'linear-gradient(45deg, #23395B , #6F7A73 )',
        fontSize: theme.typography.pxToRem(12),
    }
}))(Tooltip)
const useStyles = makeStyles(theme => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

    link: {
        color: '#3d3d3d',
        textDecoration: 'none',
    }

}))

export default function DefaultDrawer({ toggle, open, url }) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const handleCollapse = () => {
        setExpanded(!expanded)
    };

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={open}>


            <div className={classes.toolbar}>
                <IconButton onClick={toggle}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />

            <List component="nav" aria-label="menú principal">
                <NavLink to="/app" className={classes.link}>
                    {open
                        ?
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        :
                        <StyledTooltip title="Dashboard" placement="right">
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </StyledTooltip>
                    }
                </NavLink>

                {open
                    ?
                    <ListItem button onClick={handleCollapse}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Catálogos" className={classes.link} />
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    :
                    <StyledTooltip title="Catálogos" placement="right">
                        <ListItem button onClick={handleCollapse}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Catálogos" className={classes.link} />
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </StyledTooltip>


                }
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={`${url}/productos`} className={classes.link}>
                            {open
                                ?
                                <ListItem button onClick={toggle} className={classes.nested}>
                                    <ListItemIcon>
                                        <TocIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Productos" />
                                </ListItem>
                                :
                                <StyledTooltip title="Productos" placement="right">
                                    <ListItem button onClick={toggle} className={classes.nested}>
                                        <ListItemIcon>
                                            <TocIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Productos" />
                                    </ListItem>
                                </StyledTooltip>

                            }
                        </NavLink>
                        <NavLink to={`${url}/clientes`} className={classes.link}>
                            {open
                                ?
                                <ListItem button onClick={toggle} className={classes.nested}>
                                    <ListItemIcon>
                                        <AssignmentIndIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Clientes" />
                                </ListItem>
                                :
                                <StyledTooltip title="Clientes" placement="right">
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <AssignmentIndIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Clientes" />
                                    </ListItem>
                                </StyledTooltip>
                            }
                        </NavLink>
                        <NavLink to={`${url}/provedores`} className={classes.link}>
                            {open
                                ?
                                <ListItem button onClick={toggle} className={classes.nested}>
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Proveedores" />
                                </ListItem>
                                :
                                <StyledTooltip title="Proveedores" placement="right">
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <GroupIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Proveedores" />
                                    </ListItem>
                                </StyledTooltip>

                            }
                        </NavLink>
                        <NavLink to={`${url}/ubicaciones`} className={classes.link}>
                            {open
                                ?
                                <ListItem button onClick={toggle} className={classes.nested}>
                                    <ListItemIcon>
                                        <HomeWorkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Ubicaciones" />
                                </ListItem>
                                :
                                <StyledTooltip title="Ubicaciones" placement="right" >
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <HomeWorkIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Ubicaciones" />
                                    </ListItem>
                                </StyledTooltip>
                            }
                        </NavLink>
                        <NavLink to={`${url}/conceptos`} className={classes.link}>
                            {open
                                ?
                                <ListItem button onClick={toggle} className={classes.nested}>
                                    <ListItemIcon>
                                        <ForumIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Conceptos" />
                                </ListItem>
                                :
                                <StyledTooltip title="Conceptos" placement="right">
                                    <ListItem button onClick={toggle} className={classes.nested}>
                                        <ListItemIcon>
                                            <ForumIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Conceptos" />
                                    </ListItem>
                                </StyledTooltip>
                            }
                        </NavLink>

                    </List>
                </Collapse>

                <NavLink to={`${url}/compras`} className={classes.link}>
                    {open
                        ?
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Compras" />
                        </ListItem>
                        :
                        <StyledTooltip title="Compras" placement="right">
                            <ListItem button onClick={toggle}>
                                <ListItemIcon>
                                    <StoreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Compras" />
                            </ListItem>
                        </StyledTooltip>

                    }
                </NavLink>

                <NavLink to={`${url}/produccions`} className={classes.link}>

                    <StyledTooltip title="Producción" placement="right">
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <BallotIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producción" />
                        </ListItem>
                    </StyledTooltip>

                </NavLink>

                <NavLink to={`${url}/inventario`} className={classes.link}>
                    {open
                        ?
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inventario" />
                        </ListItem>
                        :
                        <StyledTooltip title="Inventario" placement="right">
                            <ListItem button onClick={toggle}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inventario" />
                            </ListItem>
                        </StyledTooltip>

                    }
                </NavLink>
                <Divider />

                <NavLink to={`${url}/pos`} className={classes.link}>
                    {open
                        ?
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText primary="POS" />
                        </ListItem>
                        :
                        <StyledTooltip title="POS" placement="right">
                            <ListItem button onClick={toggle}>
                                <ListItemIcon>
                                    <StorefrontIcon />
                                </ListItemIcon>
                                <ListItemText primary="POS" />
                            </ListItem>
                        </StyledTooltip>


                    }
                </NavLink>

                <NavLink to={`${url}/ventas`} className={classes.link} >
                    {open
                        ?
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ventas" />
                        </ListItem>
                        :
                        <StyledTooltip title="Ventas" placement="right">
                            <ListItem button onClick={toggle}>
                                <ListItemIcon>
                                    <ReceiptIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ventas" />
                            </ListItem>
                        </StyledTooltip>
                    }
                </NavLink>
            </List>

        </Drawer>
    )
}