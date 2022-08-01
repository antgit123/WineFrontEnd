import { render, screen } from "@testing-library/react";
import ErrorPage, { ErrorType } from "./ErrorPage";

describe("Error Page", () => {
  it("should display error message if rendered", () => {
    render(<ErrorPage 
        alertType = {'error'}
        title = {'Error'}
        message= {'Internal server error'}
    />);
    const errorBox = screen.getByTestId('alert-box');
    const errorText = screen.getByTestId('message-text');
    expect(errorBox).toBeInTheDocument();
    expect(errorText).toHaveTextContent('Internal server error');
  });
});
