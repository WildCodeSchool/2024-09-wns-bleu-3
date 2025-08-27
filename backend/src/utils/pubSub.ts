import { Scan } from 'src/entities/Scan'
import { createPubSub } from '@graphql-yoga/subscription'
import { ScanHistory } from 'src/entities/ScanHistory'

export const pubSub = createPubSub<{
    SCAN_CREATED: [Scan]
}>()

export const pubSubHistory = createPubSub<{
    SCAN_HISTORY_ADDED: [scanHistoryAdd: ScanHistory]
}>()
