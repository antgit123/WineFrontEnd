import { useQuery } from "react-query";
import fetchById from "../api/fetchById";
import { WineResponse } from "../api/types";

const useFetchWineInfo = (lotCode: string) => {

  return useQuery<WineResponse, Error>(lotCode, async () => {
    return await fetchById(lotCode);
  });
};

export default useFetchWineInfo;