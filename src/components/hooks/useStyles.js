
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    backgroundCustom: {

        background: 'linear-gradient(214deg, #1aa27f, #4381e0)',
        backgroundPosition: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 72,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
    root: {
        display: 'flex',
    },
    landingBar: {
        position: 'relative',
        backgroundColor: '#0F1A20',
        height: 72
    },
    appBar: {
        backgroundColor: '#23395B',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    posBar: {
        position: 'relative',
        backgroundColor: '#D81E5B'
    },
    compraBar: {
        position: 'relative',
        backgroundColor: '#660F50'
    },
    clientesBar: {
        position: 'relative',
        backgroundColor: '#FF715B'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    // drawer: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     whiteSpace: 'nowrap',
    // },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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
    // content: {
    //     flexGrow: 1,
    //     padding: theme.spacing(3),
    // },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
    posCard: {
        maxWidth: 400,
    },
    registerCard: {
        maxWidth: 500,
    },
    avatar: {
        backgroundColor: "#8A0751",
    },
    pagosCard: {
        backgroundColor: "#EFAC4F"
        // backgroundColor: "#EC9A29"
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    table: {
        minWidth: 420,
    }
    

}));

export default useStyles