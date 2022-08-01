export interface WineResponse {
    lotCode: string;
    volume: number;
    description: string | null;
    tankCode: string;
    productState: string | null;
    ownerName: string;
    components: GrapeComponent[]
}

export interface GrapeComponent{
    percentage: number;
    year: number;
    variety: string;
    region: string;
}

export interface BreakdownComposition {
    breakDownType: string;
    breakdown: Breakdown[]
}

export interface Breakdown {
    percentage: number | string;
    key: string;
}

export interface IFetchWineCompositionParams {
    key: string;
    lotCode: string;
}

export type Header = {
    "Access-Control-Allow-Origin": string;
};

export enum WinePropKeys {
    "volume" = "Volume",
    "tankCode"  = "Tank code",
    "productState" = "Product state",
    "ownerName" = "Owner"
}

export enum WineCompositionTabs {
    "year" = "Year",
    "region" = "Region",
    "variety" = "Variety",
    "year-variety"  = "Year & Variety"
}

