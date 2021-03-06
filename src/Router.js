import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';
import Produccions from './components/Produccions'
import Empleados from './components/empleados/Empleados'
import Productos from './components/productos/Productos';
import Clientes from './components/clientes/Clientes';
import Provedores from './components/Provedores';
import Ubicaciones from './components/ubicaciones/Ubicaciones';
import Compras from './components/compras/Compras';
import Inventario from './components/inventario/Inventario';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import Pos from './components/pos/Pos';
import ConceptosTabs from './components/conceptos/ConceptosTabs';
import Ventas from './components/ventas/Ventas';
import useUbicacions from './components/ubicaciones/useUbicacions'
import useStyles from './components/hooks/useStyles'
import { useAuth } from "./components/auth/use_auth.js"

export default function Router(props){
    const auth = useAuth()
    let { path, url } = useRouteMatch();
    const classes = useStyles()

    const useUbic = useUbicacions()
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
    };
    return (
        <div className={classes.root}>
            {auth.user === null ? null : 
                <React.Fragment>
                    <Header url={url} auth={auth.autenticado} logout={auth.logout} open={open} toggle={toggle} user={auth.user} />

                    <main 
                        className={
                            clsx(
                                classes.content, 
                                { [classes.contentShift]: open, }
                            )
                        } >
                        <div className={classes.toolbar} />
                            <Switch>
                                {auth.user.level >2 ? null :
                                    <Route 
                                        exact 
                                        path={path} 
                                        render={
                                            (props) => ( 
                                                <Dashboard auth={auth.autenticado}  
                                                    user={auth.user}
                                                    ubicacions={useUbic.ubicacions}
                                                /> 
                                            )
                                        }
                                    />
                                }
                                
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/productos`} component={Productos}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/produccions`} component={Produccions}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/clientes`} component={Clientes}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/provedores`} component={Provedores}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/ubicaciones`}>
                                        <Ubicaciones ubicacions={useUbic} />
                                    </Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/compras`}>
                                        <Compras 
                                            ubicacions={useUbic.ubicacions}
                                        />
                                    </Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/conceptos`} component={ConceptosTabs}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/ventas`} component={Ventas}></Route>
                                }
                                {auth.user.level > 2 ? null :
                                    <Route exact path={`${path}/empleados`} component={Empleados}></Route>
                                }
                                
                                <Route exact path={`${path}/inventario`}>
                                    <Inventario 
                                        ubicacions={useUbic.ubicacions}
                                        />
                                </Route>
                                <Route exact path={`${path}/pos`}>
                                    <Pos 
                                        ubicacions={useUbic.ubicacions}
                                        user={auth.user}
                                    />
                                </Route>
                                 
                            </Switch>
                        </main>
                </React.Fragment>
            }

            </div>
        )
    
}
