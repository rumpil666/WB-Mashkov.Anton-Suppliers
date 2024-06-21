import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types/product.types";

const BASE_URL = 'http://localhost:5000'

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    fetchAllProduct: build.query<IProduct[], number>({
      query: (limit: number = 20) => ({
        url: `/products`,
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Product']
    }),
    createProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products`,
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product']
    }),
    fetchSearchProduct: build.query<IProduct[], any>({
      query: ([field, search]) => ({
        url: `/products?${field}_like=${search}`,
      }),
    }),
  })
})
