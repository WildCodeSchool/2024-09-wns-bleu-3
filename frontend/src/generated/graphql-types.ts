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

export type Frequency = {
  __typename?: 'Frequency';
  id: Scalars['Float']['output'];
  intervalMinutes: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  scans: Array<Scan>;
};

export type FrequencyInput = {
  intervalMinutes: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewFrequence: Frequency;
  createNewScan: Scan;
  createNewTag: Tag;
  deleteFrequence: Scalars['String']['output'];
  deleteScan: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  register: Scalars['String']['output'];
  updateFrequence: Scalars['String']['output'];
  updateScan: Scalars['String']['output'];
  updateTag: Scalars['String']['output'];
};


export type MutationCreateNewFrequenceArgs = {
  data: FrequencyInput;
};


export type MutationCreateNewScanArgs = {
  data: ScanInput;
};


export type MutationCreateNewTagArgs = {
  data: TagInput;
};


export type MutationDeleteFrequenceArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteScanArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationUpdateFrequenceArgs = {
  data: UpdateFrequencyInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdateScanArgs = {
  data: UpdateScanInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllFrequences: Array<Frequency>;
  getAllScans: Array<Scan>;
  getAllTags: Array<Tag>;
  getFrequenceById: Frequency;
  getScanById: Scan;
  getTagById: Tag;
};


export type QueryGetFrequenceByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetScanByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Scan = {
  __typename?: 'Scan';
  createdAt: Scalars['DateTimeISO']['output'];
  frequency: Frequency;
  id: Scalars['Float']['output'];
  isOnline: Scalars['Boolean']['output'];
  responseTime: Scalars['Float']['output'];
  sslCertificate: Scalars['String']['output'];
  statusCode: Scalars['Float']['output'];
  statusMessage: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
  user: User;
};

export type ScanInput = {
  frequencyId?: InputMaybe<Scalars['Float']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  color: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  scans: Array<Scan>;
};

export type TagInput = {
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type UpdateFrequencyInput = {
  intervalMinutes?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScanInput = {
  id: Scalars['Float']['input'];
  tagIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  password: Scalars['String']['output'];
  scans: Array<Scan>;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateNewScanMutationVariables = Exact<{
  data: ScanInput;
}>;


export type CreateNewScanMutation = { __typename?: 'Mutation', createNewScan: { __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any } };

export type DeleteScanMutationVariables = Exact<{
  deleteScanId: Scalars['Float']['input'];
}>;


export type DeleteScanMutation = { __typename?: 'Mutation', deleteScan: string };

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type GetAllScansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScansQuery = { __typename?: 'Query', getAllScans: Array<{ __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any }> };

export type QueryQueryVariables = Exact<{
  getScanByIdId: Scalars['Float']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', getScanById: { __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any } };

export type GetAllFrequencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFrequencesQuery = { __typename?: 'Query', getAllFrequences: Array<{ __typename?: 'Frequency', id: number, intervalMinutes: number, name: string }> };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tag', color: string, id: number, name: string }> };


export const CreateNewScanDocument = gql`
    mutation CreateNewScan($data: ScanInput!) {
  createNewScan(data: $data) {
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
export type CreateNewScanMutationFn = Apollo.MutationFunction<CreateNewScanMutation, CreateNewScanMutationVariables>;

/**
 * __useCreateNewScanMutation__
 *
 * To run a mutation, you first call `useCreateNewScanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewScanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewScanMutation, { data, loading, error }] = useCreateNewScanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewScanMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewScanMutation, CreateNewScanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewScanMutation, CreateNewScanMutationVariables>(CreateNewScanDocument, options);
      }
export type CreateNewScanMutationHookResult = ReturnType<typeof useCreateNewScanMutation>;
export type CreateNewScanMutationResult = Apollo.MutationResult<CreateNewScanMutation>;
export type CreateNewScanMutationOptions = Apollo.BaseMutationOptions<CreateNewScanMutation, CreateNewScanMutationVariables>;
export const DeleteScanDocument = gql`
    mutation DeleteScan($deleteScanId: Float!) {
  deleteScan(id: $deleteScanId)
}
    `;
export type DeleteScanMutationFn = Apollo.MutationFunction<DeleteScanMutation, DeleteScanMutationVariables>;

/**
 * __useDeleteScanMutation__
 *
 * To run a mutation, you first call `useDeleteScanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScanMutation, { data, loading, error }] = useDeleteScanMutation({
 *   variables: {
 *      deleteScanId: // value for 'deleteScanId'
 *   },
 * });
 */
export function useDeleteScanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteScanMutation, DeleteScanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteScanMutation, DeleteScanMutationVariables>(DeleteScanDocument, options);
      }
export type DeleteScanMutationHookResult = ReturnType<typeof useDeleteScanMutation>;
export type DeleteScanMutationResult = Apollo.MutationResult<DeleteScanMutation>;
export type DeleteScanMutationOptions = Apollo.BaseMutationOptions<DeleteScanMutation, DeleteScanMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserLoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export const QueryDocument = gql`
    query Query($getScanByIdId: Float!) {
  getScanById(id: $getScanByIdId) {
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
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      getScanByIdId: // value for 'getScanByIdId'
 *   },
 * });
 */
export function useQueryQuery(baseOptions: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables> & ({ variables: QueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const GetAllFrequencesDocument = gql`
    query GetAllFrequences {
  getAllFrequences {
    id
    intervalMinutes
    name
  }
}
    `;

/**
 * __useGetAllFrequencesQuery__
 *
 * To run a query within a React component, call `useGetAllFrequencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFrequencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFrequencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFrequencesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>(GetAllFrequencesDocument, options);
      }
export function useGetAllFrequencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>(GetAllFrequencesDocument, options);
        }
export function useGetAllFrequencesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>(GetAllFrequencesDocument, options);
        }
export type GetAllFrequencesQueryHookResult = ReturnType<typeof useGetAllFrequencesQuery>;
export type GetAllFrequencesLazyQueryHookResult = ReturnType<typeof useGetAllFrequencesLazyQuery>;
export type GetAllFrequencesSuspenseQueryHookResult = ReturnType<typeof useGetAllFrequencesSuspenseQuery>;
export type GetAllFrequencesQueryResult = Apollo.QueryResult<GetAllFrequencesQuery, GetAllFrequencesQueryVariables>;
export const GetAllTagsDocument = gql`
    query GetAllTags {
  getAllTags {
    color
    id
    name
  }
}
    `;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
      }
export function useGetAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export function useGetAllTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<typeof useGetAllTagsLazyQuery>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllTagsSuspenseQuery>;
export type GetAllTagsQueryResult = Apollo.QueryResult<GetAllTagsQuery, GetAllTagsQueryVariables>;