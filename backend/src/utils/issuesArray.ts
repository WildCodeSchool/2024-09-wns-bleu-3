import { Issue } from "../@types/issues";
import { Scan } from "../entities/Scan";


export const issuesArray = (scans: Scan[]): Issue[] => {
      return scans.flatMap(scan => {
    const issuesForScan: Issue[] = []

    if (scan.statusCode !== 200) {
      issuesForScan.push({
        scanId: scan.id,
        issueType: 'STATUS_CODE',
        issue: `Status code is ${scan.statusCode}`,
      })
    }
    if (scan.sslCertificate === 'Expired') {
      issuesForScan.push({
        scanId: scan.id,
        issueType: 'SSL_CERTIFICATE',
        issue: 'SSL certificate is expired',
      })
    }
    if (scan.responseTime > 100) {
      issuesForScan.push({
        scanId: scan.id,
        issueType: 'RESPONSE_TIME',
        issue: `Response time is too long: ${scan.responseTime}ms`,
      })
    }

    return issuesForScan
  })
}