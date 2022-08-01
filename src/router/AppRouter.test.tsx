import {
    render,
    screen
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./AppRouter";

const getQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                retryDelay: 0,
            },
        },
    });

describe("AppRouter", () => {
    it("renders sample page", async () => {
        await render(
            <QueryClientProvider client={getQueryClient()}>
                <AppRouter />
            </QueryClientProvider>
        );
        expect(screen.getByText('Learn React')).toBeInTheDocument();
    });
});
