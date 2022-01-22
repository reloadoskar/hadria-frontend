import React from 'react'
import { Grid, Modal, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
export default function PlanStatus({open, close, body}){
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal open={open} >
            <div style={modalStyle} className={classes.paperAlerta}>
                {body}
            </div>
        </Modal>
    )
}