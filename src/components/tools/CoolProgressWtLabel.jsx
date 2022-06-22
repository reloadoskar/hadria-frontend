// import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'

const CoolProgressWtLabel = withStyles((theme) => ({
    root: {
        height: 40,
        borderRadius: 5
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    },
}))(LinearProgress)

export default CoolProgressWtLabel