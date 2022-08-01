import fetchById from "./fetchById";
import wineInfo from "../tests/mocks/wine-info/wineInfo.json";
import { rest } from "msw";
import urls from "../tests/mocks/urls";
import { server } from "../tests/mocks/server";

const lotCode = "15MPPN002-VK";

describe("fetchById", () => {
    it("should successfully fetch the details of wine", async () => {
        const wineInfoEndpointSpyPass = jest.fn((req, res, ctx) => {
            return res.once(ctx.json(wineInfo));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyPass));
        const result = await fetchById(lotCode);
        expect(result).toEqual(wineInfo);
        expect(wineInfoEndpointSpyPass).toBeCalledTimes(1);
    });

    it("should fail and throw an error message", async () => {
        const wineInfoEndpointSpyFail = jest.fn((req, res, ctx) => {
            return res.once(ctx.status(500), ctx.json({ message: "Internal Server error while handling the request" }));
        });
        server.use(rest.get(urls.wineInfo, wineInfoEndpointSpyFail));
        await expect(fetchById(lotCode)).rejects.toThrowError("Internal Server error while handling the request");
        expect(wineInfoEndpointSpyFail).toBeCalledTimes(1);
    });
});
