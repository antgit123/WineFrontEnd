import { EditRounded } from "@material-ui/icons";
import { Box, styled } from "@mui/material";
import theme from "../theme";

export const WineBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px',
    gap: '9px',
    position: 'absolute',
    width: '768px',
    height: '531px',
    left: `calc(50% - 768px/2)`,
    top: '100px'
});

export const WineHeaderBox = styled(Box)({
    display: 'flex',
    flex: 'none',
    order: '0',
    alignSelf: 'flex-start',
    flexGrow: '0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '768px'
})

export const WineIconContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px',
    gap: '10px',
    width: '40px',
    height: '40px'
})

export const WineTitleWrapperContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '4px',
    flex: 'none',
    order: '0',
    flexGrow: '0'
})

export const WineTitleContainer = styled('div')({
    display: 'flex',
    flex: 'none',
    order: '1',
    flexGrow: '0'
})

export const WineDescriptionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    padding: '0px',
    gap: '6px',
    flex: 'none',
    order: '2',
    flexGrow: '0'
})

export const WineEditContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    padding: '22px 0px',
    gap: '10px',
    height: '100px',
    flex: 'none',
    order: '1',
    alignSelf: 'center',
    flexGrow: '0'
})

export const WineDetailsBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0px',
    height: '144px',
    flex: 'none',
    order: '1',
    alignSelf: 'stretch',
    flexGrow: '0'
})

export const EditButton = styled(EditRounded)({
    background: theme.palette?.commonGreen?.main,
    boxShadow: '0px 4px 8px rgba(51,51,51,0.24)',
    borderRadius: '100px',
    color: '#FFFFFF',
    fontSize: '24px',
    '&.MuiSvgIcon-root':{
        width: '2em',
        height: '2em',
        padding: '8px'
    }
})