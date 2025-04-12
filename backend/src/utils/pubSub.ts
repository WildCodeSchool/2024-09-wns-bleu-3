import { Scan } from "src/entities/Scan"
import { createPubSub } from "@graphql-yoga/subscription"

export const pubSub = createPubSub<{
    SCAN_CREATED: [Scan]
}>()