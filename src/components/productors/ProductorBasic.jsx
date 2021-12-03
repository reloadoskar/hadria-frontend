import React, { useState, useContext } from 'react';
import { Grid, Typography, Badge, IconButton, Avatar } from '@material-ui/core';
import avatarh from '../../img/avatarH5.png'
import avatarm from '../../img/avatarM3.png'
import VisibilityIcon from '@material-ui/icons/Visibility';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import CancelIcon from '@material-ui/icons/Cancel';
import { ProductorContext } from './ProductorContext'
import Confirm from '../dialogs/Confirm';

export default function ProductorBasic({ productor }) {
  const { removeProductor } = useContext(ProductorContext)
  const [confirm, setConfirm] = useState(false)
  const onConfirm = () => {
    removeProductor(productor._id)
      .then(() => {

      })
  }
  return !productor ? null :
    <Grid item container xs={12}>
      <Grid ite xs={2}>
        <img src={avatarh} width="150" />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6">
          {productor.clave} - {productor.nombre}
        </Typography>
        <Typography><HomeIcon /> {productor.direccion}</Typography>
        <Typography><PhoneAndroidIcon /> {productor.tel1}</Typography>
        <Typography><EmailIcon /> {productor.email.toLowerCase()}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align='right'>
          <Badge variant="dot" color="secondary">
            <IconButton size="small">
              <VisibilityIcon />
            </IconButton>
          </Badge>
          <IconButton size="small" onClick={() => setConfirm(true)} >
            <CancelIcon />
          </IconButton>
          <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
        </Typography>
      </Grid>
    </Grid>
}