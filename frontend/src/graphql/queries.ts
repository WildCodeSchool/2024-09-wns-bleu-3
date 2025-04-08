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
    lastScannedAt
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
    lastScannedAt
  }
}`

export const GET_ALL_FREQUENCIES = gql`
query GetAllFrequences {
  getAllFrequences {
    id
    intervalMinutes
    name
  }
}`

export const GET_ALL_TAGS = gql`
query GetAllTags {
  getAllTags {
    color
    id
    name
  }
}`


export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      isLoggedIn
      email
      username
    }
  }
`;
