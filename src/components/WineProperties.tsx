import { Grid, Typography } from "@mui/material";
import { WinePropKeys } from "../api/types";

interface WinePropsParams {
    wineProps: WineProps
}

interface WineProps {
    volume: number;
    tankCode: string;
    productState: string | null;
    ownerName: string;
}

const WineProperties = ({ wineProps }: WinePropsParams) => {
    return (
        <>
            {
                Object.keys(WinePropKeys).map(key =>
                    <Grid style={{ height: '32px' }} container item xs={12} key={key}>
                        <Grid item xs={6} pl={2}><Typography variant="body1" component="span">{WinePropKeys[key as keyof typeof WinePropKeys]}</Typography></Grid>
                        <Grid item pr={2} style={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}><Typography variant="body2" component="span">{wineProps[key as keyof typeof wineProps]}</Typography></Grid>
                    </Grid>
                )}
        </>


    )
}

export default WineProperties;