import tls from 'node:tls'

export async function getSSLCertificateExpireTime(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            // Use Url object to get the url informatio like hostname and port
            const parsedUrl = new URL(url)
            const hostname = parsedUrl.hostname
            const port = Number(parsedUrl.port) || 443

            // Open connection (communication) between our server and the host server
            const socket = tls.connect({ host: hostname, port, servername: hostname }, () => {
                // get the TLS/SSL certificate
                const cert = socket.getPeerCertificate()

                // Check if there is a certificate
                if (!cert || Object.keys(cert).length === 0) {
                    reject(new Error('No certificate available'))
                }
                else {
                    // If certificate exist, calculate the time remaining
                    const validTo = new Date(cert.valid_to)
                    const now = new Date()
                    const timeLeft = validTo.getTime() - now.getTime()

                    // If 0 time remaining, return expired, else return into a string
                    if (timeLeft < 0) {
                        resolve('Expired')
                    }
                    else {
                        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
                        resolve(`${daysLeft} day${daysLeft !== 1 ? 's' : ''}`)
                    }
                }

                // Close communication
                socket.end()
            })

            socket.on('error', (err) => {
                reject(err)
            })
        }
        catch (error) {
            reject(new Error(`An error occurred: ${error.message}`))
        }
    })
}
