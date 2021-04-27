import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';

import { IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

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
import useStyles from './hooks/useStyles'
export default function DefaultDrawer({ toggle, open, url, user }) {
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

            {!user ? null :
            <List component="nav" aria-label="menú principal">
                { user.level > 2 ? null :
                    <NavLink exact to="/app" 
                        className={classes.link} 
                        activeClassName={classes.active} 
                        >
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tablero" />
                        </ListItem>
                            
                    </NavLink>
                }

                { user.level > 2 ? null :
                    <React.Fragment>
                        <ListItem button onClick={handleCollapse}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Catálogos" className={classes.link} />
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {user.level > 2 ? null :
                                    <NavLink 
                                        className={classes.link} 
                                        activeClassName={classes.active} 
                                        exact to={`${url}/empleados`}>
                                            <ListItem button onClick={toggle} className={classes.nested}>
                                                <ListItemIcon>
                                                    <GroupIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Empleados" />
                                            </ListItem>                                    
                                    </NavLink>
                                }
                                
                                <NavLink exact to={`${url}/productos`} 
                                    className={classes.link} 
                                    activeClassName={classes.active} 
                                >
                                    <ListItem button onClick={toggle} className={classes.nested}>
                                        <ListItemIcon>
                                            <TocIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Productos" />
                                    </ListItem>
                                        
                                </NavLink>
                                {user.level > 2 ? null :
                                    <NavLink exact to={`${url}/clientes`} 
                                        className={classes.link} 
                                        activeClassName={classes.active} 
                                        >
                                        <ListItem button onClick={toggle} className={classes.nested}>
                                            <ListItemIcon>
                                                <AssignmentIndIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Clientes" />
                                        </ListItem>
                                            
                                    </NavLink>
                                }

                                {user.level > 2 ? null :
                                    <NavLink exact to={`${url}/provedores`} 
                                        className={classes.link} 
                                        activeClassName={classes.active} 
                                        >
                                        <ListItem button onClick={toggle} className={classes.nested}>
                                            <ListItemIcon>
                                                <GroupIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Proveedores" />
                                        </ListItem>                                
                                    </NavLink>
                                }

                                { user.level > 2 ? null :
                                    <NavLink exact to={`${url}/ubicaciones`}
                                    className={classes.link} 
                                    activeClassName={classes.active} 
                                    >
                                        <ListItem button onClick={toggle} className={classes.nested}>
                                            <ListItemIcon>
                                                <HomeWorkIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Ubicaciones" />
                                        </ListItem>                                    
                                    </NavLink>
                                }

                                { user.level > 3 ? null : 
                                    <NavLink exact to={`${url}/conceptos`}
                                        className={classes.link} 
                                        activeClassName={classes.active} 
                                        >
                                        <ListItem button onClick={toggle} className={classes.nested}>
                                            <ListItemIcon>
                                                <ForumIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Conceptos" />
                                        </ListItem>
                                    </NavLink>
                                }

                            </List>
                        </Collapse>
                    </React.Fragment>
                }

                
                {user.level > 2 ? null :
                    <NavLink exact to={`${url}/compras`}
                        className={classes.link} 
                        activeClassName={classes.active} 
                    >
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Compras" />
                        </ListItem>                        
                    </NavLink>
                }
                
                { user.level > 2 ? null :
                    <NavLink exact to={`${url}/produccions`} 
                        className={classes.link} 
                        activeClassName={classes.active} 
                    >
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <BallotIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producción" />
                        </ListItem>
                    </NavLink>
                }

                { user.level > 3 ? null :

                <React.Fragment>
                    <NavLink exact to={`${url}/inventario`}
                        className={classes.link} 
                        activeClassName={classes.active} 
                    >

                            <ListItem button onClick={toggle}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inventario" />
                            </ListItem>
                            
                    </NavLink>
                    <Divider />

                </React.Fragment>
                }


                <NavLink exact to={`${url}/pos`} 
                    className={classes.link} 
                    activeClassName={classes.active} 
                >

                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText primary="Punto De Venta" />
                        </ListItem>
                        
                </NavLink>

                {user.level > 2 ? null :
                    <NavLink exact to={`${url}/ventas`} 
                        className={classes.link} 
                        activeClassName={classes.active} 
                    >
                        <ListItem button onClick={toggle}>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ventas" />
                        </ListItem>    
                    </NavLink>
                }
            </List>
            }
        </Drawer>
    )
}