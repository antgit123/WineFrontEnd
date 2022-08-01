import fetchWineComposition from "./fetchWineComposition";
import wineCompositionInfo from "../tests/mocks/wine-composition-info/compositionInfo.json";
import { rest } from "msw";
import urls from "../tests/mocks/urls";
import { server } from "../tests/mocks/server";

const params = {
    lotCode: "15MPPN002-VK",
    key: "year"
};

describe("fetchList", () => {
    it("should successfully fetch wine composition data", async () => {
        const wineCompositionEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res(ctx.json(wineCompositionInfo));
        });
        server.use(rest.get(urls.wineCompositionInfo, wineCompositionEndpointSpyPass));
        const result = await fetchWineComposition(params);
        expect(result).toEqual(wineCompositionInfo);
        expect(wineCompositionEndpointSpyPass).toHaveBeenCalledTimes(1);
    });

    it("should fail and throw an error message", async () => {
        const wineCompositionEndpointSpyFail = jest.fn((req, res, ctx) => {
            return res.once(ctx.status(502), ctx.json({ message: "Internal Server error while handling the request" }));
        });
        server.use(rest.get(urls.wineCompositionInfo, wineCompositionEndpointSpyFail));
        await expect(fetchWineComposition(params)).rejects.toThrowError("Internal Server error while handling the request");
        expect(wineCompositionEndpointSpyFail).toHaveBeenCalledTimes(1);
    });
});
