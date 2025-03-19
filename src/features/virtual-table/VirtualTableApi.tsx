/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetAllDataResponse {
  id: number;
  name: string;
  gender: "male" | "female";
  email: string;
  mobile: string;
  country: string;
  active: boolean;
}

const VirtualTableApi = createApi({
  reducerPath: "mockdata",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66cc16844290b1c4f19bdba1.mockapi.io",
  }),
  endpoints: (builder) => ({
    getAllData: builder.query<GetAllDataResponse[], void>({
      query: () => `/virtual`,
    }),
  }),
});

export default VirtualTableApi;
export const { useGetAllDataQuery } = VirtualTableApi;
export type { GetAllDataResponse };
