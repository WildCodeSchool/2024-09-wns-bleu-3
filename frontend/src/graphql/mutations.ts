import { gql } from "@apollo/client";

/******* SCAN *********/

export const CREATE_NEW_SCAN = gql`
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
  }`

export const DELETE_SCAN = gql`
mutation DeleteScan($deleteScanId: Int!) {
    deleteScan(id: $deleteScanId)
  }`

/******* TAG *********/

export const CREATE_NEW_TAG = gql`
mutation CreateNewTag($data: TagInput!) {
    createNewTag(data: $data) {
      id
      name
      color
    }
  }`

  /******* USER *********/
export const REGISTER = gql`
  mutation Register($data: UserInput!) {
  register(data: $data)
}`


export const LOGIN = gql`
  mutation Login($data: UserLoginInput!) {
  login(data: $data)
}`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }`

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($userEmail: String!) {
  forgotPassword(userEmail: $userEmail)
}
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($confirmPassword: String!, $newPassword: String!, $code: String!) {
  changePassword(confirmPassword: $confirmPassword, newPassword: $newPassword, code: $code)
}

`

export const DELETE_USER = gql`
mutation DeleteUser($id: Float!) {
  deleteUser(id: $id)
}
`
export const UPDATE_USER = gql`
mutation UpdateUser($data: UpdateUserInput!, $updateUserId: Float!) {
  updateUser(data: $data, id: $updateUserId)
}`