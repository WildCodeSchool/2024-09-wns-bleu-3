
import { getIconStatusInfos, getStatusDescription, getStatusMessage, getUptime } from "@/utils/scans"
import CardDetail from "./CardDetail"
import { IScanDetails } from "@/pages/ScanDetailsPage"
import { TITLE } from "./scanTitle"
import { useGetScanHistoryQuery } from "@/generated/graphql-types"


const ScanDetailsCards = ({ scan }: { scan: IScanDetails }) => {

    const { id, statusCode, responseTime,createdAt,tags } = scan


    /**  Status Card
     * - on récupère la valeur du status
     * - et l'icone correspondant
     **/
    const statusCardValue = getStatusMessage(statusCode)
    const statusCardIcon = getIconStatusInfos(statusCardValue)


    /** Response Time Card
     * - on récupère l'icone
     * - et la couleur
     **/
    const responseTimeCardIcon = getIconStatusInfos(TITLE["Response Time"])


    /** Uptime Card
    * - calcul uptime via l'historique
    * - on récupère l'icone
    * - et la couleur
    **/
    const uptimeCardIcon = getIconStatusInfos(TITLE.Uptime)

    const result = useGetScanHistoryQuery({ variables: { scanId: id } })
    const history = result.data?.getScanHistory ?? []
    const uptimeCardValue = getUptime(history)


    /** Created Card
     * - la date de creation
     * - l'icone
     * - la couleur
     * - et les tags
     **/

    const createdCardValue = new Date(createdAt).toISOString().slice(0,10);
    const createdCardIcon = getIconStatusInfos(TITLE.Created)


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">

                {/**Status */}
                <CardDetail title={TITLE.Status}
                    value={statusCardValue}
                    icon={statusCardIcon.icon}
                    color={statusCardIcon.color}
                    description={getStatusDescription(scan, TITLE.Status)}
                />


                {/**Response Time */}
                <CardDetail title={TITLE["Response Time"]}
                    value={`${responseTime} ms`}
                    icon={responseTimeCardIcon.icon}
                    color={responseTimeCardIcon.color}
                    description={getStatusDescription(scan, TITLE["Response Time"])}
                />

                {/**Uptime */}
                <CardDetail title={TITLE.Uptime}
                    value={uptimeCardValue}
                    icon={uptimeCardIcon.icon}
                    color={uptimeCardIcon.color}
                    description={getStatusDescription(scan, TITLE.Uptime)}
                />

                {/**Created */}
                <CardDetail title={TITLE.Created}
                    value={createdCardValue}
                    icon={createdCardIcon.icon}
                    color={createdCardIcon.color}
                    tags={tags}
                    description={getStatusDescription(scan, TITLE.Uptime)}
                />


            </div>


        </>
    )
}

export default ScanDetailsCards