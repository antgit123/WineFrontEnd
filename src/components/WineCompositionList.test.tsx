import {
    render,
    waitFor,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import wineCompositionInfo from "../tests/mocks/wine-composition-info/compositionInfo.json";
import { server } from "../tests/mocks/server";
import { rest } from "msw";
import urls from "../tests/mocks/urls";
import userEvent from "@testing-library/user-event";
import WineCompositionList from "./WineCompositionList";

const id = "15MPPN002-VK";
const getQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                retryDelay: 0,
            },
        }
    })
}
const renderTest = async () => {
    await render(
        <QueryClientProvider client={getQueryClient()}>
            <WineCompositionList lotCode={id} />
        </QueryClientProvider>
    );
};

describe("WineCompositionList", () => {
    it("should retrieve the wine compositions", async () => {
        const wineCompositionEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res(ctx.status(200), ctx.json(wineCompositionInfo));
        });
        server.use(rest.get(urls.wineCompositionInfo, wineCompositionEndpointSpyPass));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        expect(wineCompositionEndpointSpyPass).toBeCalledTimes(1);
    });

    it("should display error message if wine composition network call throws error", async () => {
        const wineCompositionEndpointSpyFail = jest.fn((req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: "Internal Server error while handling the request" }));
        });
        server.use(rest.get(urls.wineCompositionInfo, wineCompositionEndpointSpyFail));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        expect(screen.getByTestId("message-text")).toBeInTheDocument();
        expect(screen.getByText("Wine breakdown composition could not be retrieved: Internal Server error while handling the request"));
        //to accommodate retries
        expect(wineCompositionEndpointSpyFail).toBeCalledTimes(2);
    });

    it("verify tab selection on fetching wine composition details", async () => {
        const wineCompositionEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res(ctx.status(200), ctx.json(wineCompositionInfo));
        });
        server.use(rest.get(urls.wineCompositionInfo, wineCompositionEndpointSpyPass));
        renderTest();
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        const regionTab = screen.getByTestId('tabHeader-region');
        expect(regionTab).toBeInTheDocument();
        userEvent.click(regionTab);
        await waitFor(() => screen.getByTestId("spinner"));
        await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
        expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Region');
    });
});
