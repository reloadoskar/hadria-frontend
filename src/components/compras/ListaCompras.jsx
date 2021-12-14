import React, {useState, useEffect} from 'react'
import { CircularProgress, Grid, Typography, Button, Menu, MenuItem, Divider } from '@material-ui/core'
import CompraBasic from './CompraBasic'
import { sumImporte, formatNumber } from '../Tools'
import useStyles  from '../hooks/useStyles'
import CountUpAnimation from '../tools/CountUpAnimation'
export default function ListaCompras({compras, editCompra, verCompra, recuperarVentas, recuperarGastos, meses, month, onChangeMonth}){
    const classes = useStyles()
    const [lasCompras, setLasCompras] = useState(null)

    const [tVentas, setVentas] = useState(0)
    const [tCosto, setCosto] = useState(0)
    const [tPagos, setPagos] = useState(0)
    const [tGastos, setGastos] = useState(0)
    const [tResultado, setResultado] = useState(0)

    const [anchorEl, setAnchorEl] = React.useState(null);
    useEffect(() => {
        if(compras){
            setLasCompras(compras)
        }
        return () => setLasCompras(null)
    },[compras])

    useEffect(()=>{
        if(lasCompras){
            let tc = 0
            tc = sumImporte(lasCompras)
            setCosto(tc)
            let tv = 0
            lasCompras.map(compra=> tv += sumImporte(compra.ventaItems))
            setVentas(tv)
            let tg = 0
            lasCompras.map(compra=> tg += sumImporte(compra.gastos))
            setGastos(tg)
            let tp = 0
            lasCompras.map(compra=> tp += sumImporte(compra.pagos))
            setPagos(tp)
            let tr = tv - tc - tg
            setResultado(tr)
        }
        return () => clearTotals()
    },[lasCompras])
    const clearTotals = () => {
        setCosto(0)
        setVentas(0)
        setResultado(0)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleChange = (mes) => {
        setLasCompras(null)
        onChangeMonth(mes)
        handleClose()
    }
    return(
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} sm={3}>
                        <Button 
                            fullWidth
                            onClick={handleClick}
                            className={classes.botonsoteGenerico} 
                            children={
                                meses[month]
                        }/>
                        <Menu 
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            onClose={handleClose}
                        >
                            {meses.map((mes,i)=>(
                                <MenuItem onClick={()=>handleChange(i)} key={i}>{mes}</MenuItem>
                            ))}
                        </Menu>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography variant="h2" align="center">{lasCompras ? <CountUpAnimation num={lasCompras.length} temp={300} /> : null}</Typography>
                    <Typography align="center">Operaciones</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align="right">Venta total</Typography>
                    <Typography variant="h5" align="right">$ <CountUpAnimation num={tVentas} temp={650} /></Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align="right">Costo total</Typography>
                    <Typography align="right" variant="h5" className={classes.textoMirameSangron}>$<CountUpAnimation num={tCosto} temp={900} /></Typography>
                    <Typography align="right" variant="h6">Pagos: -$<CountUpAnimation num={tPagos} temp={520} /></Typography>
                    <Divider />
                    <Typography align="right" variant="h6">Saldo: $<CountUpAnimation num={tCosto-tPagos} temp={500} /></Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align="right">Gasto total</Typography>
                    <Typography variant="h5" align="right">-$<CountUpAnimation num={tGastos} temp={560}/></Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align="right">Resultado</Typography>
                    <Typography align="right" variant="h5" className={tResultado > 0 ? classes.textoMirameExito : classes.textoMirameSangron}>$<CountUpAnimation num={tResultado} temp={230} /></Typography>
                </Grid>
            {lasCompras === null ?
                <Grid item xs={12}>
                    <Typography component="div" align="center" >
                        <CircularProgress />
                    </Typography>
                </Grid>
                :
                <React.Fragment>
                    {lasCompras
                    .map((compra, i) => (
                        <Grid item xs={12} key={i}>
                            <CompraBasic 
                                key={i} 
                                compra={compra} 
                                editCompra={editCompra}  
                                verCompra={verCompra}
                                recuperarVentas={recuperarVentas}
                                recuperarGastos={recuperarGastos}
                            />
                        </Grid>
                    ))
                    }
                
                </React.Fragment>
            }
        </Grid>
    )
}