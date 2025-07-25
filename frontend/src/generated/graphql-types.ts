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

export type Issue = {
  __typename?: 'Issue';
  id: Scalars['String']['output'];
  issue: Scalars['String']['output'];
  issueType: Scalars['String']['output'];
  scanId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String']['output'];
  createNewFrequence: Frequency;
  createNewRole: Role;
  createNewScan: Scan;
  createNewTag: Tag;
  deleteFrequence: Scalars['String']['output'];
  deleteRole: Scalars['String']['output'];
  deleteScan: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  deleteUser: Scalars['String']['output'];
  forgotPassword: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  pauseOrRestartScan: Scan;
  register: Scalars['String']['output'];
  updateFrequence: Scalars['String']['output'];
  updateScan: Scalars['String']['output'];
  updateTag: Scalars['String']['output'];
  updateUser: Scalars['String']['output'];
};


export type MutationChangePasswordArgs = {
  code: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCreateNewFrequenceArgs = {
  data: FrequencyInput;
};


export type MutationCreateNewRoleArgs = {
  data: RoleInput;
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


export type MutationDeleteRoleArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteScanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationForgotPasswordArgs = {
  userEmail: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationPauseOrRestartScanArgs = {
  id: Scalars['Int']['input'];
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


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllFrequences: Array<Frequency>;
  getAllRoles: Array<Role>;
  getAllScans: Array<Scan>;
  getAllScansByUserId: ScanByUserId;
  getAllTags: Array<Tag>;
  getFrequenceById: Frequency;
  getScanById: Scan;
  getScanHistory: Array<ScanHistory>;
  getTagById: Tag;
  getUserInfo?: Maybe<UserInfo>;
  previewScan: ScanPreview;
};


export type QueryGetFrequenceByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetScanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetScanHistoryArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  scanId: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryPreviewScanArgs = {
  url: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type RoleInput = {
  name: Scalars['String']['input'];
};

export type Scan = {
  __typename?: 'Scan';
  createdAt: Scalars['DateTimeISO']['output'];
  frequency: Frequency;
  history: Array<ScanHistory>;
  id: Scalars['Float']['output'];
  isOnline: Scalars['Boolean']['output'];
  isPause: Scalars['Boolean']['output'];
  lastScannedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  nextScanAt?: Maybe<Scalars['DateTimeISO']['output']>;
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

export type ScanByUserId = {
  __typename?: 'ScanByUserId';
  issues: Array<Issue>;
  scans: Array<Scan>;
  totalIssues: Scalars['Int']['output'];
  totalScans: Scalars['Int']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type ScanHistory = {
  __typename?: 'ScanHistory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  isOnline: Scalars['Boolean']['output'];
  responseTime: Scalars['Float']['output'];
  scan: Scan;
  sslCertificate: Scalars['String']['output'];
  statusCode: Scalars['Float']['output'];
  statusMessage: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ScanInput = {
  frequencyId?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type ScanPreview = {
  __typename?: 'ScanPreview';
  isOnline: Scalars['Boolean']['output'];
  responseTime: Scalars['Int']['output'];
  sslCertificate: Scalars['String']['output'];
  statusCode: Scalars['Int']['output'];
  statusMessage: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newScan: Scan;
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
  frequencyId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  tagIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  password: Scalars['String']['output'];
  role: Role;
  scans: Array<Scan>;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  isLoggedIn: Scalars['Boolean']['output'];
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

export type UpdateScanMutationVariables = Exact<{
  data: UpdateScanInput;
}>;


export type UpdateScanMutation = { __typename?: 'Mutation', updateScan: string };

export type DeleteScanMutationVariables = Exact<{
  deleteScanId: Scalars['Int']['input'];
}>;


export type DeleteScanMutation = { __typename?: 'Mutation', deleteScan: string };

export type PauseOrRestartScanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PauseOrRestartScanMutation = { __typename?: 'Mutation', pauseOrRestartScan: { __typename?: 'Scan', id: number, isPause: boolean } };

export type CreateNewTagMutationVariables = Exact<{
  data: TagInput;
}>;


export type CreateNewTagMutation = { __typename?: 'Mutation', createNewTag: { __typename?: 'Tag', id: number, name: string, color: string } };

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ForgotPasswordMutationVariables = Exact<{
  userEmail: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type ChangePasswordMutationVariables = Exact<{
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  updateUserId: Scalars['Float']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: string };

export type PreviewScanQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type PreviewScanQuery = { __typename?: 'Query', previewScan: { __typename?: 'ScanPreview', url: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean } };

export type GetAllScansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScansQuery = { __typename?: 'Query', getAllScans: Array<{ __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any, lastScannedAt?: any | null }> };

export type GetScanByIdQueryVariables = Exact<{
  getScanByIdId: Scalars['Int']['input'];
}>;


export type GetScanByIdQuery = { __typename?: 'Query', getScanById: { __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, isPause: boolean, createdAt: any, updatedAt: any, lastScannedAt?: any | null, frequency: { __typename?: 'Frequency', id: number, name: string, intervalMinutes: number }, tags: Array<{ __typename?: 'Tag', id: number, name: string, color: string }> } };

export type GetAllFrequencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFrequencesQuery = { __typename?: 'Query', getAllFrequences: Array<{ __typename?: 'Frequency', id: number, intervalMinutes: number, name: string }> };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tag', color: string, id: number, name: string }> };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo?: { __typename?: 'UserInfo', id: number, isLoggedIn: boolean, email: string, username: string } | null };

export type GetScanHistoryQueryVariables = Exact<{
  scanId: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetScanHistoryQuery = { __typename?: 'Query', getScanHistory: Array<{ __typename?: 'ScanHistory', id: number, url: string, statusCode: number, statusMessage: string, responseTime: number, isOnline: boolean, createdAt: any }> };

export type GetAllScansByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScansByUserIdQuery = { __typename?: 'Query', getAllScansByUserId: { __typename?: 'ScanByUserId', totalIssues: number, totalScans: number, username?: string | null, issues: Array<{ __typename?: 'Issue', id: string, scanId: number, issueType: string, issue: string }>, scans: Array<{ __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any, lastScannedAt?: any | null, frequency: { __typename?: 'Frequency', id: number, intervalMinutes: number, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, color: string }> }> } };

export type ScanCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScanCreatedSubscription = { __typename?: 'Subscription', newScan: { __typename?: 'Scan', id: number, url: string, title: string, statusCode: number, statusMessage: string, responseTime: number, sslCertificate: string, isOnline: boolean, createdAt: any, updatedAt: any, lastScannedAt?: any | null } };


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
export const UpdateScanDocument = gql`
    mutation UpdateScan($data: UpdateScanInput!) {
  updateScan(data: $data)
}
    `;
export type UpdateScanMutationFn = Apollo.MutationFunction<UpdateScanMutation, UpdateScanMutationVariables>;

/**
 * __useUpdateScanMutation__
 *
 * To run a mutation, you first call `useUpdateScanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScanMutation, { data, loading, error }] = useUpdateScanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateScanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScanMutation, UpdateScanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateScanMutation, UpdateScanMutationVariables>(UpdateScanDocument, options);
      }
export type UpdateScanMutationHookResult = ReturnType<typeof useUpdateScanMutation>;
export type UpdateScanMutationResult = Apollo.MutationResult<UpdateScanMutation>;
export type UpdateScanMutationOptions = Apollo.BaseMutationOptions<UpdateScanMutation, UpdateScanMutationVariables>;
export const DeleteScanDocument = gql`
    mutation DeleteScan($deleteScanId: Int!) {
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
export const PauseOrRestartScanDocument = gql`
    mutation PauseOrRestartScan($id: Int!) {
  pauseOrRestartScan(id: $id) {
    id
    isPause
  }
}
    `;
export type PauseOrRestartScanMutationFn = Apollo.MutationFunction<PauseOrRestartScanMutation, PauseOrRestartScanMutationVariables>;

/**
 * __usePauseOrRestartScanMutation__
 *
 * To run a mutation, you first call `usePauseOrRestartScanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseOrRestartScanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseOrRestartScanMutation, { data, loading, error }] = usePauseOrRestartScanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePauseOrRestartScanMutation(baseOptions?: Apollo.MutationHookOptions<PauseOrRestartScanMutation, PauseOrRestartScanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseOrRestartScanMutation, PauseOrRestartScanMutationVariables>(PauseOrRestartScanDocument, options);
      }
export type PauseOrRestartScanMutationHookResult = ReturnType<typeof usePauseOrRestartScanMutation>;
export type PauseOrRestartScanMutationResult = Apollo.MutationResult<PauseOrRestartScanMutation>;
export type PauseOrRestartScanMutationOptions = Apollo.BaseMutationOptions<PauseOrRestartScanMutation, PauseOrRestartScanMutationVariables>;
export const CreateNewTagDocument = gql`
    mutation CreateNewTag($data: TagInput!) {
  createNewTag(data: $data) {
    id
    name
    color
  }
}
    `;
export type CreateNewTagMutationFn = Apollo.MutationFunction<CreateNewTagMutation, CreateNewTagMutationVariables>;

/**
 * __useCreateNewTagMutation__
 *
 * To run a mutation, you first call `useCreateNewTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTagMutation, { data, loading, error }] = useCreateNewTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewTagMutation, CreateNewTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewTagMutation, CreateNewTagMutationVariables>(CreateNewTagDocument, options);
      }
export type CreateNewTagMutationHookResult = ReturnType<typeof useCreateNewTagMutation>;
export type CreateNewTagMutationResult = Apollo.MutationResult<CreateNewTagMutation>;
export type CreateNewTagMutationOptions = Apollo.BaseMutationOptions<CreateNewTagMutation, CreateNewTagMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($userEmail: String!) {
  forgotPassword(userEmail: $userEmail)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($confirmPassword: String!, $newPassword: String!, $code: String!) {
  changePassword(
    confirmPassword: $confirmPassword
    newPassword: $newPassword
    code: $code
  )
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      confirmPassword: // value for 'confirmPassword'
 *      newPassword: // value for 'newPassword'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Float!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!, $updateUserId: Float!) {
  updateUser(data: $data, id: $updateUserId)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateUserId: // value for 'updateUserId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const PreviewScanDocument = gql`
    query PreviewScan($url: String!) {
  previewScan(url: $url) {
    url
    statusCode
    statusMessage
    responseTime
    sslCertificate
    isOnline
  }
}
    `;

/**
 * __usePreviewScanQuery__
 *
 * To run a query within a React component, call `usePreviewScanQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewScanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewScanQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function usePreviewScanQuery(baseOptions: Apollo.QueryHookOptions<PreviewScanQuery, PreviewScanQueryVariables> & ({ variables: PreviewScanQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewScanQuery, PreviewScanQueryVariables>(PreviewScanDocument, options);
      }
export function usePreviewScanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewScanQuery, PreviewScanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewScanQuery, PreviewScanQueryVariables>(PreviewScanDocument, options);
        }
export function usePreviewScanSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PreviewScanQuery, PreviewScanQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PreviewScanQuery, PreviewScanQueryVariables>(PreviewScanDocument, options);
        }
export type PreviewScanQueryHookResult = ReturnType<typeof usePreviewScanQuery>;
export type PreviewScanLazyQueryHookResult = ReturnType<typeof usePreviewScanLazyQuery>;
export type PreviewScanSuspenseQueryHookResult = ReturnType<typeof usePreviewScanSuspenseQuery>;
export type PreviewScanQueryResult = Apollo.QueryResult<PreviewScanQuery, PreviewScanQueryVariables>;
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
    lastScannedAt
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
export const GetScanByIdDocument = gql`
    query GetScanById($getScanByIdId: Int!) {
  getScanById(id: $getScanByIdId) {
    id
    url
    title
    statusCode
    statusMessage
    responseTime
    sslCertificate
    isOnline
    isPause
    createdAt
    updatedAt
    lastScannedAt
    frequency {
      id
      name
      intervalMinutes
    }
    tags {
      id
      name
      color
    }
  }
}
    `;

/**
 * __useGetScanByIdQuery__
 *
 * To run a query within a React component, call `useGetScanByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScanByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScanByIdQuery({
 *   variables: {
 *      getScanByIdId: // value for 'getScanByIdId'
 *   },
 * });
 */
export function useGetScanByIdQuery(baseOptions: Apollo.QueryHookOptions<GetScanByIdQuery, GetScanByIdQueryVariables> & ({ variables: GetScanByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScanByIdQuery, GetScanByIdQueryVariables>(GetScanByIdDocument, options);
      }
export function useGetScanByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScanByIdQuery, GetScanByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScanByIdQuery, GetScanByIdQueryVariables>(GetScanByIdDocument, options);
        }
export function useGetScanByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScanByIdQuery, GetScanByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScanByIdQuery, GetScanByIdQueryVariables>(GetScanByIdDocument, options);
        }
export type GetScanByIdQueryHookResult = ReturnType<typeof useGetScanByIdQuery>;
export type GetScanByIdLazyQueryHookResult = ReturnType<typeof useGetScanByIdLazyQuery>;
export type GetScanByIdSuspenseQueryHookResult = ReturnType<typeof useGetScanByIdSuspenseQuery>;
export type GetScanByIdQueryResult = Apollo.QueryResult<GetScanByIdQuery, GetScanByIdQueryVariables>;
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
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    id
    isLoggedIn
    email
    username
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export function useGetUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoSuspenseQueryHookResult = ReturnType<typeof useGetUserInfoSuspenseQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetScanHistoryDocument = gql`
    query GetScanHistory($scanId: Float!, $limit: Float) {
  getScanHistory(scanId: $scanId, limit: $limit) {
    id
    url
    statusCode
    statusMessage
    responseTime
    isOnline
    createdAt
  }
}
    `;

/**
 * __useGetScanHistoryQuery__
 *
 * To run a query within a React component, call `useGetScanHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScanHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScanHistoryQuery({
 *   variables: {
 *      scanId: // value for 'scanId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetScanHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetScanHistoryQuery, GetScanHistoryQueryVariables> & ({ variables: GetScanHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScanHistoryQuery, GetScanHistoryQueryVariables>(GetScanHistoryDocument, options);
      }
export function useGetScanHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScanHistoryQuery, GetScanHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScanHistoryQuery, GetScanHistoryQueryVariables>(GetScanHistoryDocument, options);
        }
export function useGetScanHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScanHistoryQuery, GetScanHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScanHistoryQuery, GetScanHistoryQueryVariables>(GetScanHistoryDocument, options);
        }
export type GetScanHistoryQueryHookResult = ReturnType<typeof useGetScanHistoryQuery>;
export type GetScanHistoryLazyQueryHookResult = ReturnType<typeof useGetScanHistoryLazyQuery>;
export type GetScanHistorySuspenseQueryHookResult = ReturnType<typeof useGetScanHistorySuspenseQuery>;
export type GetScanHistoryQueryResult = Apollo.QueryResult<GetScanHistoryQuery, GetScanHistoryQueryVariables>;
export const GetAllScansByUserIdDocument = gql`
    query GetAllScansByUserId {
  getAllScansByUserId {
    issues {
      id
      scanId
      issueType
      issue
    }
    totalIssues
    scans {
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
      lastScannedAt
      frequency {
        id
        intervalMinutes
        name
      }
      tags {
        id
        name
        color
      }
    }
    totalScans
    username
  }
}
    `;

/**
 * __useGetAllScansByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAllScansByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScansByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScansByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllScansByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>(GetAllScansByUserIdDocument, options);
      }
export function useGetAllScansByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>(GetAllScansByUserIdDocument, options);
        }
export function useGetAllScansByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>(GetAllScansByUserIdDocument, options);
        }
export type GetAllScansByUserIdQueryHookResult = ReturnType<typeof useGetAllScansByUserIdQuery>;
export type GetAllScansByUserIdLazyQueryHookResult = ReturnType<typeof useGetAllScansByUserIdLazyQuery>;
export type GetAllScansByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetAllScansByUserIdSuspenseQuery>;
export type GetAllScansByUserIdQueryResult = Apollo.QueryResult<GetAllScansByUserIdQuery, GetAllScansByUserIdQueryVariables>;
export const ScanCreatedDocument = gql`
    subscription ScanCreated {
  newScan {
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
    lastScannedAt
  }
}
    `;

/**
 * __useScanCreatedSubscription__
 *
 * To run a query within a React component, call `useScanCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useScanCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScanCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useScanCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ScanCreatedSubscription, ScanCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ScanCreatedSubscription, ScanCreatedSubscriptionVariables>(ScanCreatedDocument, options);
      }
export type ScanCreatedSubscriptionHookResult = ReturnType<typeof useScanCreatedSubscription>;
export type ScanCreatedSubscriptionResult = Apollo.SubscriptionResult<ScanCreatedSubscription>;