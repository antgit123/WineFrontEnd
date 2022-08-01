import { Alert, AlertTitle, Box, Typography } from "@mui/material";

export type ErrorType = {
  alertType: 'error' | 'info';
  title: string;
  message: string;
};

const ErrorPage = ({ alertType, message, title }: ErrorType) => {
  return (
    <Box data-testid="alert-box">
      <Alert severity={alertType}>
        <AlertTitle>{title}</AlertTitle>
        <Typography data-testid="message-text">{message}</Typography>
      </Alert>
    </Box>
  );
};

export default ErrorPage;