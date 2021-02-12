import React, { useState } from 'react'
import { Card, CardContent, Tab, Tabs,
    Grid,
    Typography 
} from '@material-ui/core'
import {formatNumber} from '../Tools'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && 
          
          children
          
        }
    </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function Disponible(props){
    const {disp} = props
    const [value, setValue] = useState(0)
    const handleChange = (e, nvalue) => {
        setValue(nvalue)
    }
    return(
        <Card>
            <CardContent>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    centered
                >
                    <Tab label="Disponible" {...a11yProps(0)}/>
                    <Tab label="Cortes" {...a11yProps(1)}/>
                </Tabs>

                <TabPanel value={value} index={0}>
                    {disp.map((ub,i)=>(
                        <Grid container key={i}>
                            <Grid item xs>
                                <Typography variant="h6">{ub.ubicacion}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6" align="right">{formatNumber(ub.disponible)}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </TabPanel>


                {/* <Typography variant="h5">Disponible</Typography>
                <Divider />
                <Typography align="right" variant="h6">{formatNumber(balance.disponible)}</Typography> */}
            </CardContent>
        </Card>
    )
}