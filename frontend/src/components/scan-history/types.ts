export interface ScanItem {
    id: string
    url: string
    title: string
    statusCode: number
    responseTime: string
    statusMessage: string
    sslCertificate: string
    isOnline: boolean
    createdAt: string
    updatedAt: string
    history?: {
      timestamp: string
      responseTime: number
      statusCode: number
    }[]
  }
  
  