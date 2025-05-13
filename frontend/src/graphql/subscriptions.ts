import { gql } from "@apollo/client";

export const SCAN_CREATED_SUBSCRIPTION = 
gql`subscription ScanCreated {
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