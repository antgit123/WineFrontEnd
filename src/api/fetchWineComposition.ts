import { BreakdownComposition, IFetchWineCompositionParams } from "./types";

async function fetchWineComposition(fetchWineParams: IFetchWineCompositionParams): Promise<BreakdownComposition> {
    const { key, lotCode } = fetchWineParams;
    const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wines/api/breakdown/${key}/${lotCode}`
    );
    const data = await result.json();
    if (!result.ok) throw Error(data.message);
    return data;
}

export default fetchWineComposition;