import { useQuery } from "react-query";
import fetchWineComposition from "../api/fetchWineComposition";
import { BreakdownComposition, IFetchWineCompositionParams } from "../api/types";

const useFetchWineCompositionList = (fetchWineParams: IFetchWineCompositionParams) => {

  return useQuery<BreakdownComposition, Error>(fetchWineParams.key, async () => {
    return await fetchWineComposition(fetchWineParams);
  });
};

export default useFetchWineCompositionList;