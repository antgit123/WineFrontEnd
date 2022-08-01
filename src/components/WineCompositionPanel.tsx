import { ArrowDownward } from "@material-ui/icons";
import { Box, BoxProps, Button, Grid, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Breakdown, BreakdownComposition, WineCompositionTabs } from "../api/types";
import { wineCompositionsPerPage } from "../constants";
import theme from "../theme";
import { ITabDef } from "./shared/SharedTabs";

interface TabPanelProps extends BoxProps {
    children?: React.ReactNode;
    index: keyof typeof WineCompositionTabs;
    value: keyof typeof WineCompositionTabs;
    tab: ITabDef;
    wineCompositionData: BreakdownComposition | undefined;
}

const PanelBox = styled(Box)({
    background: '#FFFFFF',
    border: '1px solid #E8E8E8',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
    borderRadius: '2px',
    flex: 'none',
    order: '0',
    alignSelf: 'stretch',
    flexGrow: '0'
})

const CompositionRow = styled(Grid)({
    height: '48px',
    display: 'flex',
    alignItems: 'center'
})

const ShowMoreButton = styled(Button)({
    textTransform: 'capitalize',
    color: theme.palette?.commonGreen?.dark,
})

const WineCompositionPanel = ({ wineCompositionData, index, value }: TabPanelProps) => {

    const [wineCompositions, setWineCompositions] = useState<Breakdown[]>([]);
    const [counter, setCounter] = useState(wineCompositionsPerPage);

    useEffect(() => {
        if (wineCompositionData) {
            loopWithSlice(wineCompositionsPerPage);
        }
    }, []);

    if (!wineCompositionData) {
        return (
            <Box>
                Composition details cannot be found
            </Box>
        )
    }
    const loopWithSlice = (end: number) => {
        const { breakdown } = wineCompositionData;
        const slicedCompositionList = breakdown.slice(0, end);
        setWineCompositions(slicedCompositionList);
    };

    const displayMoreCompositions = () => {
        loopWithSlice(counter + wineCompositionsPerPage);
        setCounter(counter + wineCompositionsPerPage);
    };

    return (
        <PanelBox
            role="tabpanel"
            hidden={index !== value}
            id={`tabPanel-${value}`}
            data-testid={`tabpanel-${value}`}
        >
            {value === index && (
                wineCompositions.map(breakdown => {
                    return (
                        <CompositionRow container item xs={12} key={breakdown.key} style={{ borderBottom: `1px solid #E8E8E8` }}>
                            <Grid item pl={2} xs={6}><Typography variant="subtitle2">{breakdown.key}</Typography></Grid>
                            <Grid item pr={2} style={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}><Typography variant="subtitle2">{`${breakdown.percentage}%`}</Typography></Grid>
                        </CompositionRow>
                    )
                })
            )}
            {
                wineCompositionData.breakdown.length > counter &&
                <CompositionRow item xs={12} style={{ justifyContent: 'center' }}>
                    <ShowMoreButton
                        variant="text"
                        data-testid="showMore-button"
                        endIcon = {<ArrowDownward style={{fontSize: '13px'}}/>}
                        onClick={() => displayMoreCompositions()}>
                        Show More
                    </ShowMoreButton>
                </CompositionRow>
            }
        </PanelBox>
    )

}

export default WineCompositionPanel;