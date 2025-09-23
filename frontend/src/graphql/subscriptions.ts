import { gql } from "@apollo/client";

export const SCAN_CREATED_SUBSCRIPTION =
  gql`subscription OnScanCreated {
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
  }
`;

export const SCAN_HISTORY_ADDED =
  gql`subscription ScanHistoryAdded {
  scanHistoryAdded {
    id
    url
    statusCode
    statusMessage
    responseTime
    sslCertificate
    isOnline
    createdAt
    scan {
      id
      url
      title
      user { 
      id
      }
    }
  }
}
`;