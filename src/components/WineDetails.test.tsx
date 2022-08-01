import {
    render,
    waitFor,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import WineDetails from "./WineDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import wineInfo from "../tests/mocks/wine-info/wineInfo.json";
import { server } from "../tests/mocks/server";
import { rest } from "msw";
import urls from "../tests/mocks/urls";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const id = "15MPPN002-VK";

const renderTest = async () => {
    const getQueryClient = () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    retryDelay: 0,
                },
            },
        });

    await render(
        <QueryClientProvider client={getQueryClient()}>
            <MemoryRouter initialEntries={[`/wines/${id}`]}>
                <Routes>
                    <Route path="/wines/:id" element={<WineDetails />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
};

describe("WineDetails", () => {
    it("should display the wine information on success response", async () => {
        const wineInfoEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res(ctx.json(wineInfo));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyPass));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        expect(wineInfoEndpointSpyPass).toBeCalledTimes(1);
        expect(screen.getByTestId('wine-lotCode-text')).toHaveTextContent('15MPPN002-VK');
        expect(screen.getByTestId('wine-description-text')).toHaveTextContent('2015 Mornington Peninsula Pinot Noir - Vintage Kerr special batch');
    });

    it("should display the alert message when edit button is clicked", async () => {
        const wineInfoEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res(ctx.json(wineInfo));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyPass));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        const editButton = screen.getByTestId('wine-edit-button');
        userEvent.click(editButton);
        expect(await screen.getByText('Clicked edit button')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: /close/i }));
        await waitForElementToBeRemoved(() => screen.getByText('Clicked edit button'));
        expect(screen.queryByText('Clicked edit button')).not.toBeInTheDocument();
    });

    it("should display error message if network call throws error", async () => {
        const wineInfoEndpointSpyFail = jest.fn((req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: "Internal Server error while handling the request" }));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyFail));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        const errorText = screen.getByTestId("message-text");
        expect(errorText).toBeInTheDocument();
        expect(errorText).toHaveTextContent("Wine details could not be retrieved: Internal Server error while handling the request");
    });

    it("should display not found message if network call returns no data", async () => {
        const wineInfoEndpointSpyFail = jest.fn((req, res, ctx) => {
            return res(ctx.status(404), ctx.json({ message: "Wine details does not exist" }));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyFail));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        const errorText = screen.getByTestId("message-text");
        expect(errorText).toBeInTheDocument();
        expect(errorText).toHaveTextContent("Wine details could not be retrieved: Wine details does not exist");
    });
});
