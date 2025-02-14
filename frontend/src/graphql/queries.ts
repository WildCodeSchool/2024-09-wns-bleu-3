import { gql } from "@apollo/client";

export const GET_ALL_SCANS = gql`
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
}`

export const GET_SCAN_BY_ID = gql`
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
}`


