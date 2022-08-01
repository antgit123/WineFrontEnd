import { Stack, TabProps, Tabs as MuiTabs, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import { StyledTab } from "./SharedTabs.styled";

export interface ITabDef {
    label: string;
    value: string;
}

interface ITabProps extends TabProps {
    currentTab: string;
    tabDefs: ITabDef[];
    handleChange: (event: React.SyntheticEvent, currentTab: any) => void;
}

const SharedTabs = ({ tabDefs, currentTab, handleChange }: ITabProps) => {
    return (
        <MuiTabs value={currentTab} onChange={handleChange}
            TabIndicatorProps={{
                style: {
                    backgroundColor: theme.palette?.commonGreen?.main
                }   
            }}
        >
            {
                tabDefs.map((tab) => {
                    return (
                        <StyledTab
                            key={`tabHeader-${tab.value}`}
                            value={tab.value}
                            data-testid={`tabHeader-${tab.value}`}
                            label = {
                                <Stack flexDirection="row">
                                    <Typography variant="subtitle1">{tab.label}</Typography>
                                </Stack>
                            } 
                        />
                    )
                })
            }
        </MuiTabs>
    )
}

export default SharedTabs;