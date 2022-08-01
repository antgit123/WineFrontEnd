import { Box, CircularProgress, Stack, styled } from "@mui/material";
import { useState } from "react";
import { WineCompositionTabs } from "../api/types";
import useFetchWineCompositionList from "../hooks/useFetchWineComposition";
import ErrorPage from "../pages/shared/ErrorPage";
import SharedTabs from "./shared/SharedTabs";
import WineCompositionPanel from "./WineCompositionPanel";

interface WineCompositionParams {
  lotCode: string
}

interface ITabDef {
  label: string;
  value: string;
}

const WineCompositionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  flex: 'none',
  order: '3',
  alignSelf: 'stretch',
  flexGrow: '0'
})

const WineCompositionList = ({lotCode}:WineCompositionParams) => {
  const [currentTab, setCurrentTab] = useState<keyof typeof WineCompositionTabs>("year");
  const { isLoading, isError, data: wineCompositionData, error } = useFetchWineCompositionList({
    key: currentTab,
    lotCode: lotCode as string
  });

  const tabDefinitions:ITabDef[] = Object.keys(WineCompositionTabs).map((key) => ({
    value: key,
    label: WineCompositionTabs[key as keyof typeof WineCompositionTabs]
  })); 

  if (isLoading) {
    return (
        <CircularProgress data-testid="spinner" color="secondary" />
    );
  }

  if (isError) {
    return (
      <ErrorPage
        alertType="error"
        title="Error retrieving composition data"
        message={`Wine breakdown composition could not be retrieved: ${error.message}`} />
    );
  }

  return (
    <WineCompositionBox>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <SharedTabs
          currentTab={currentTab}
          tabDefs={tabDefinitions}
          handleChange={(_,value) => setCurrentTab(value)}
        />  
      </Stack>
      {
        tabDefinitions.map(tab => {
          return(
            <WineCompositionPanel
               key = {`tabPanel-${tab.value}`}
               value={currentTab as keyof typeof WineCompositionTabs} 
               index={tab.value as keyof typeof WineCompositionTabs}
               wineCompositionData = {wineCompositionData}
               tab = {tab}
            />
          )
        })
      }
    </WineCompositionBox>
  );
};

export default WineCompositionList;