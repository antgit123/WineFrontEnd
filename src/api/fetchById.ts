import { WineResponse } from "./types";

async function fetchById(
    lotCode: string,
): Promise<WineResponse> {
    const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wines/${lotCode}`,
    );
    const data = await result.json();
    if (!result.ok) throw Error(data.message);
    return { ...data };
}

export default fetchById;