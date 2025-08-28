import { Scan } from 'src/entities/Scan'
import { createPubSub } from '@graphql-yoga/subscription'
import { ScanHistory } from 'src/entities/ScanHistory'

export const pubSub = createPubSub<{
    SCAN_CREATED: [Scan];
    SCAN_HISTORY_ADDED: [ScanHistory];
}>();
