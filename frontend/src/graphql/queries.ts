import { gql } from "@apollo/client";

/******* SCAN *********/

// Preview scan query for unauthenticated users
export const PREVIEW_SCAN = gql`
query PreviewScan($url: String!) {
  previewScan(url: $url) {
    url
    statusCode
    statusMessage
    responseTime
    sslCertificate
    isOnline
  }
}`

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
query Query($getScanByIdId: Int!) {
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


/******* FREQUENCE *********/
export const GET_ALL_FREQUENCIES = gql`
query GetAllFrequences {
  getAllFrequences {
    id
    intervalMinutes
    name
  }
}`


/******* TAG *********/
export const GET_ALL_TAGS = gql`
query GetAllTags {
  getAllTags {
    color
    id
    name
  }
}`


/******* USER *********/
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

export const GET_SCAN_HISTORY = gql`
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
`

/******* DASHBOARD *********/
export const GET_DASHBOARD_USER_DATA = gql`
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