
import { ArrowBack } from "@material-ui/icons";
import { Alert, CircularProgress, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchWineInfo from "../hooks/useFetchWineInfo";
import ErrorPage from "../pages/shared/ErrorPage";
import WineCompositionList from "./WineCompositionList";
import { EditButton, WineBox, WineDescriptionContainer, WineDetailsBox, WineEditContainer, WineHeaderBox, WineIconContainer, WineTitleContainer, WineTitleWrapperContainer } from "./WineDetails.styled";
import WineProperties from "./WineProperties";

const WineDetails = () => {

  const { id } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Clicked edit button");
  const { isLoading, isError, data: wineInfo, error } = useFetchWineInfo(id as string);
  if (isLoading) {
    return (
      <CircularProgress data-testid="spinner" color="secondary" />
    );
  }
  if (isError || !wineInfo) {
    return (
      <ErrorPage
        alertType="error"
        title="Error retrieving wine details data"
        message={`Wine details could not be retrieved: ${error?.message}`} />
    );
  }
  const { lotCode, description, components, ...wineDetails } = wineInfo;

  const displaySnackbar = () => {
    setShowMessage(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setShowMessage(false);
  };
  return (
    <WineBox>
      <Snackbar open={showMessage} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <WineHeaderBox>
        <WineTitleWrapperContainer>
          <WineIconContainer>
            <ArrowBack style={{ width: '24px', height: '24px' }} />
          </WineIconContainer>
          <WineTitleContainer>
            <Typography variant="h1" data-testid="wine-lotCode-text">
              {wineInfo.lotCode}
            </Typography>
          </WineTitleContainer>
          <WineDescriptionContainer>
            <Typography variant="caption" component="p" sx={{ marginTop: '8px' }} data-testid="wine-description-text">
              {wineInfo.description}
            </Typography>
          </WineDescriptionContainer>
        </WineTitleWrapperContainer>
        <WineEditContainer>
          <IconButton
            data-testid="wine-edit-button"
            sx={{ fontSize: '24px' }}
            onClick={() => displaySnackbar()}
          >
            <EditButton />
          </IconButton>
        </WineEditContainer>
      </WineHeaderBox>
      <WineDetailsBox>
        <WineProperties
          wineProps={wineDetails}
        />
      </WineDetailsBox>
      <WineCompositionList
        lotCode={lotCode}
      />
    </WineBox>
  );
};

export default WineDetails;