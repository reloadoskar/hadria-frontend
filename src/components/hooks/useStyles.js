
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
// const getRandomColor =() => {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
const useStyles = makeStyles(theme => ({ 
    
    root: {
        display: 'flex',
    },

    sobreTexto: {
        fontSize: '11px',
        color: '#3d3d3d'
    },
    textoGroovie: {
        color: '#00af91',
    },
    textoSangron: {
        color: '#c70039',
    },
    textoMiniFacheron: {
        fontSize: '11px',
        fontWeight: 'bold'
    },
    textoMirame: {
        fontWeight: 'bolder'
    },
    textoMirameSangron: {
        fontWeight: 'bolder',
        color: '#c70039'
    },
    textoMirameExito: {
        fontWeight: 'bolder',
        color: '#1EAE98'
    },
    textoMirameFondoAmarillo: {
        fontWeight: 'bolder',
        color: '#1EAE98',
        backgroundColor: '#C77711'
    },
    textoSubrayado: {
        fontWeight: 'bolder',
        fontSize: '30px',
        backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '120% 0.4em',
        backgroundPosition: '0 88%',
        transition: theme.transitions.create('background-size', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.standard,
        }),
        '&:hover': {
            backgroundSize: '100% 88%'
        }
    },
    textoSubrayadoNice: {
        // display: 'inline',
        // borderBottom: '3px solid #f9dd94'
        background: 'linear-gradient(to left, #f69ec4, #f9dd94 100%)',
        backgroundPosition: '0 100%',
        backgroundSize: '100% 2px',
        backgroundRepeat: 'repeat-x'
    },
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
    isLoading: {
        margin: 'auto',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    landingBar: {
        background: 'linear-gradient(45deg, #393e46 30%, #222831 90%)',
        // backgroundColor: '#393e46',
        height: 72,        
    },
    center: {
        paddingLeft: 15,
        paddingRight: 15,
        lineHeight: "72px",
        height: "72px",
        color: "#ffffff"
    },
    basicBar: {
        position: 'relative',
        backgroundColor: '#222831',
        height: 72
    },
    posCard: {
        maxWidth: 400,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundCustom: {
        background: 'linear-gradient(30deg, #4B1431 40%, #5B2441 90%)',
        // background: 'linear-gradient(45deg, #2CF6B3 30%, #2DEFF6 90%)',
        backgroundPosition: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 64,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
    appBar: {
        backgroundColor: '#393e46',
        // background: 'linear-gradient(45deg, #393e46 30%, #222831 90%)',
        position: "fixed",
        height: 72,
        width: "100%",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
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
    menuButton: {
        marginRight: 36,
    },




    posBar: {
        position: 'relative',
        backgroundColor: '#e6b566'
    },
    
    compraBar: {
        position: 'relative',
        backgroundColor: '#660F50'
    },
    comprasBar: {
        position: 'relative',
        backgroundColor: '#6f686d'
    },
    produccionBar: {
        position: 'relative',
        backgroundColor: '#212020'
    },
    clientesBar: {
        position: 'relative',
        backgroundColor: '#FF715B'
    },
    inversionsBar: {
        position: 'relative',
        backgroundColor: '#FF715B',
        height: 72,
    },
    
    
    hide: {
        display: 'none',
    },
    // // drawer: {
    // //     width: drawerWidth,
    // //     flexShrink: 0,
    // //     whiteSpace: 'nowrap',
    // // },
    
    
    
    // // content: {
    // //     flexGrow: 1,
    // //     padding: theme.spacing(3),
    // // },
    
    nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
    link: {
        color: '#393e46',
        textDecoration: 'none',
        '&:hover': {
            fontWeight: "bolder",
            color: "#EC9A29",
            textDecoration: 'none',
        }
    },
    active: {
        fontWeight: "bold",
        color: "#F0B056",
        
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
    
        
    // },
    // table: {
    //     minWidth: 420,
    // },

    

    basic: {
        backgroundColor: "#FFE873"
    },
    pro: {
        backgroundColor: "#5CB9CC"
    },
    master: {
        backgroundColor: "#EC4E20"
    },
    suspended: {
        backgroundColor: "#c70039",
        color: "#ffffff",
    },
    colored: {
        backgroundColor: 'linear-gradient(214deg, #1aa27f, #4381e0)',
    },
    
    botonSimplon: {
        border: 0,
        height: 48
    },
    botonGenerico: {
        background: 'linear-gradient(45deg, #ffd369 50%, #ffdf91 90%)',
        border: 0,
        borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(61, 61, 61, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
    },
    botonMagico: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    botonCosmico: {
        background: 'linear-gradient(45deg, #2CF6B3 30%, #2DEFF6 90%)',
        border: 0,
        // borderRadius: 3,
        boxShadow: '0 1px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
    },
    botonSatanico: {
        background: 'linear-gradient(45deg, #e22e5d 30%, #9e2041 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 1px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    botonsoteGenerico: {
        background: 'linear-gradient(45deg, #ffd369 50%, #ffdf91 90%)',
        border: 0,
        borderRadius: 3,
        color: 'black',
        height: 96,
        fontSize: 32,
        padding: '0 30px',
    },
    media: {
        height: 190,
    },

    pesadasList: {
        height: 400,
    },

    cajaBonita: {
        height: 300,
        width: 350,
    },

    cardScrollable: {
        maxHeight: 350,
        overflow: 'auto'
    },

    error404: {
        marginTop: "25%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paperBasico: {
        margin: 6,
        padding:15,
        width: '100%',
        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'
    },

    paperSingle: {
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
    },

    paperSutil: {
        margin: 6,
        padding:15,
        width: '100%',
        boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px'
    },

    paperContorno: {
        margin: 6,
        padding:15,
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px'
    },
    
    paperPlanes: {
        margin: -6,
        padding: -5,
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px'
    },

    paperAmarillo: {
        margin: 6,
        padding: 15,
        background : '#F9E6C8',
        width: '100%',
    },

    paperVerde: {
        background : '#2CF6B3',
        width: '100%',
    },

    paperGris: {
        background : '#BABABA',
        width: '100%',      
    },

    paperAlerta: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    borderInferior: {
        border: 1,
        borderRadius: 3,
        color: 'black',
    },

    rootPagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },

}));

export default useStyles