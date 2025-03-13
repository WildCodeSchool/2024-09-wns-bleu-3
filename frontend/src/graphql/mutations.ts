import { gql } from "@apollo/client";


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
mutation DeleteScan($deleteScanId: Float!) {
    deleteScan(id: $deleteScanId)
  }`

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
  register(data: $data)
}`


export const LOGIN = gql`
  mutation Login($data: UserLoginInput!) {
  login(data: $data)
}`

