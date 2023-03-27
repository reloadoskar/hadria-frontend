
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
export const escalaDeColores = [
    "#9A031E", 
    "#2C363F", 
    "#EDAE49",
    "#AABD8C", 
    "#BFACB5", 
    "#76717A", 
    "#F2F3AE", 
    "#EFD6AC",
];

export const blue = {
    '--background-start': '#2196F3',
    '--background-end': '#21CBF3',
    '--box-shadow': 'rgba(33, 203, 243, .3)',
  };
  
export const danger = {
'--background-start': '#9A031E',
'--background-end': '#FF8E53',
'--box-shadow': 'rgba(255, 105, 135, .3)',
};
const useStyles = makeStyles(theme => ({ 
    root: {
        display: 'flex',
    },
    sobreTexto: {
        fontSize: '11px',
        color: '#3d3d3d'
    },
    textField1: {
        border: "none",
        '& input:invalid':{
            color: 'red',
            fontWeight: 'bold'
        }
    },

    gridTabla2c:{
        '& nth-child(2)':{
            border:"1px",
            background: "#f1f1f3"
        }
    },

    coolRow: {
        '& #row:nth-child(odd)':{
            background: "#f2f5ff"
        }
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
        color: '#F64740'
    },
    textoMirameExito: {
        fontWeight: 'bolder',
        color: '#68B68A'
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
    blurred: {
        webkitFilter: 'blur(4px)',
        mozFilter: 'blur(4px)',
        oFilter: 'blur(4px)',
        msFilter: 'blur(4px)',
        filter: 'blur(4px)',
        width: '500px',
        height: '50px',
        backgroundColor: '#fff'
    },
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
        backgroundColor: "#0a0f0d",
        color: "#000203",
    },
    confirm: {
        backgroundColor: "#0a0f0d",
        color: "#fff0ff",
    },
    colored: {
        backgroundColor: 'linear-gradient(214deg, #1aa27f, #4381e0)',
    },
    
    fondoAmarillo:{
        background: 'linear-gradient(78deg, #f4edcd, #FCE6C5)',
        color:"#000000"
    },
    fondoAzul:{
        background: 'linear-gradient(214deg, #b5cfe3, #c3e0fe)',
        color:"#000000"
    },
    fondoVerde:{
        background: 'linear-gradient(214deg, #9FF9DE, #B0E8D3)',
        color:"#000000"
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
    sketchy: {
        padding: '1rem 1.2rem',
        display: 'inline-block',
        border: '3px solid #333333',
        fontSize: '2.5rem',
        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
        textTransform: 'uppercase',
        letterSpacing: '0.3ch',
        background: '#ffffff',
        position: 'relative',
        "&:before": {
            content: '',
            border: '2px solid #353535',
            display: 'block',
            width: '100%',
            height: "100%",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg)",
            borderRadius: '1% 1% 2% 4% / 2% 6% 5% 4%'
        }
    },
    botonGris: {
        background: 'linear-gradient(45deg, #636364 50%, #636388 90%)',
        border: 0,
        borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(61, 61, 61, .3)',
        color: 'white',
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
    botonAzuloso: {
        background: 'linear-gradient(45deg, #0094c6 30%, #8CA3E3 90%)',
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
    paperPaginaConSalto:{
        pageBreakAfter:"always"
    },
    paperBasico: {
        padding:15,
        width: '100%',
        boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'
    },
    paperSingle: {
        // padding: 15,
        padding: theme.spacing(2, 4, 3),
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
        padding: 16,
        background : '#ffd369',
        width: '100%',
    },
    paperVerde: {
        background : '#68B68A',
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
    textoIniciales: {
        color: "#111", 
        fontFamily: "'Open Sans Condensed', sans-serif",
        fontSize: "64px",
        fontWeight: "700",
        lineHeight: "64px",
        margin: "0 0 0",
        padding: "20px 30px",
        textAlign: "center",
        textTransform: "uppercase" 
    },
    elegantshadow: {
        textAlign: "center",
        color: "#FFF",
        letterSpacing: ".15em",
        textShadow: [
          "1px -1px 0 #767676", 
          "-1px 2px 1px #737272", 
          "-2px 4px 1px #767474", 
          "-3px 6px 1px #787777", 
          "-4px 8px 1px #7b7a7a", 
          "-5px 10px 1px #7f7d7d", 
          "-6px 12px 1px #828181", 
          "-7px 14px 1px #868585", 
          "-8px 16px 1px #8b8a89", 
          "-9px 18px 1px #8f8e8d", 
          "-10px 20px 1px #949392", 
          "-11px 22px 1px #999897", 
          "-12px 24px 1px #9e9c9c", 
          "-13px 26px 1px #a3a1a1", 
          "-14px 28px 1px #a8a6a6", 
          "-15px 30px 1px #adabab", 
          "-16px 32px 1px #b2b1b0", 
          "-17px 34px 1px #b7b6b5", 
          "-18px 36px 1px #bcbbba", 
          "-19px 38px 1px #c1bfbf", 
          "-20px 40px 1px #c6c4c4", 
          "-21px 42px 1px #cbc9c8", 
          "-22px 44px 1px #cfcdcd", 
          "-23px 46px 1px #d4d2d1", 
          "-24px 48px 1px #d8d6d5", 
          "-25px 50px 1px #dbdad9", 
          "-26px 52px 1px #dfdddc", 
          "-27px 54px 1px #e2e0df", 
          "-28px 56px 1px #e4e3e2"
        ]
      },
      textoTresDe: {
        marginTop: "20px",        
        textShadow:  [
            "4px -1px 1px #FF3D7F",
            "-1px -4px 1px #76BCAD",
            "0 2px 1px #F7BC05"
        ]
      },
      boxGris: {
        width: "100%",
        marginBottom: "50px",
        color: "#FFF",
        backgroundColor: "#2C363F" 
      },
    blue: {
    '--background-start': '#2196F3',
    '--background-end': '#21CBF3',
    '--box-shadow': 'rgba(33, 203, 243, .3)',
    },
    danger: {
        '--background-start': '#9A031E',
        '--background-end': '#FF8E53',
        '--box-shadow': 'rgba(255, 105, 135, .3)',
    },
    rainbow: {
        width :  '100%',
        height:  '100%',
        animation: "o-rotate-360 linear 8s infinite",
      
        span: {
          display: 'block',
          width: '100%', height: '100%',
          position: 'relative',
          transform: 'translate(-50%, -50%)',
      
        '&:after': {
            display: 'block',
            content: "",
            width: '100%', height: '100%',
            position: 'absolute',
            left: '100%'
        },
      
        '&:firstChild': {
            background: '#65587f',
            after: { background: '#f18867' }
        },
                  
        '&:lastChild': {
            background: '#e85f99',
            after: { background: '#50bda1' }
        }
        }
      }
      
}));

export default useStyles