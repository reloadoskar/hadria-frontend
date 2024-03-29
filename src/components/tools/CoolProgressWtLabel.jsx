// import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'

const CoolProgressWtLabel = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 2
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    },
}))(LinearProgress)



export default CoolProgressWtLabel