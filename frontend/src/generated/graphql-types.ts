import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewScan: Scan;
  deleteScan: Scalars['String']['output'];
};


export type MutationCreateNewScanArgs = {
  data: ScanInput;
};


export type MutationDeleteScanArgs = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllScans: Array<Scan>;
  getScanById: Scan;
};


export type QueryGetScanByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Scan = {
  __typename?: 'Scan';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  isOnline: Scalars['Boolean']['output'];
  responseTime: Scalars['Float']['output'];
  sslCertificate: Scalars['String']['output'];
  statusCode: Scalars['Float']['output'];
  statusMessage: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

export type ScanInput = {
  isOnline: Scalars['Boolean']['input'];
  responseTime: Scalars['Float']['input'];
  sslCertificate: Scalars['String']['input'];
  statusCode: Scalars['Float']['input'];
  statusMessage: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type GetAllScansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScansQuery = { __typename?: 'Query', getAllScans: Array<{ __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any }> };


export const GetAllScansDocument = gql`
    query GetAllScans {
  getAllScans {
    id
    url
    title
    statusCode
    statusMessage
    responseTime
    sslCertificate
    isOnline
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllScansQuery__
 *
 * To run a query within a React component, call `useGetAllScansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllScansQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScansQuery, GetAllScansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllScansQuery, GetAllScansQueryVariables>(GetAllScansDocument, options);
      }
export function useGetAllScansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScansQuery, GetAllScansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllScansQuery, GetAllScansQueryVariables>(GetAllScansDocument, options);
        }
export function useGetAllScansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllScansQuery, GetAllScansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllScansQuery, GetAllScansQueryVariables>(GetAllScansDocument, options);
        }
export type GetAllScansQueryHookResult = ReturnType<typeof useGetAllScansQuery>;
export type GetAllScansLazyQueryHookResult = ReturnType<typeof useGetAllScansLazyQuery>;
export type GetAllScansSuspenseQueryHookResult = ReturnType<typeof useGetAllScansSuspenseQuery>;
export type GetAllScansQueryResult = Apollo.QueryResult<GetAllScansQuery, GetAllScansQueryVariables>;