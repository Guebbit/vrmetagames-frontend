import type { currentUserMap, mediaChunkMap, infoChunkMap } from "@/interfaces";

/**
 *
 */
export interface userMap extends currentUserMap {
    // color assigned to user in current session (fullcalendar event color)
    color?: string
}

/**
 *
 */
export interface sendScheduleRequestMap {
    id: string,             // id of schedule
    confirm?: boolean       // set schedule to confirmed
    pay?: boolean           // auto-pay (fast mode)
    useWallet?: boolean     // use wallet while auto-pay
}

/**
 *
 */
export interface scheduleInputMap {
    id?: string
    resourceId?: string[]
    start: number
    end: number
    allDay?: boolean
}

/**
 * SCHEDULE TYPES:
 *
 * ONLINE
 *  - false: only on client, lost on closing (CONFIRMED false only)
 *  - true: online (can be confirmed later)
 * CONFIRMED
 *  - false: awaiting payment
 *  - true: payment done, final stage (ONLINE only, UNSAVED true admin only)
 * UNSAVED
 *  - false: normal situation
 *  - true: unsaved offline changes on event (UNSAVED true means the schedule was edited and changes need to be sent online)
 * CANCELED
 *  - false: normal situation
 *  - true: a previously ONLINE schedule that has been removed (not from database)
 */
export interface scheduleMap extends scheduleInputMap {
    id :string
    userId :string
    stationId :string,
    online :boolean     // WARNING: FE only
    confirmed :boolean
    unsaved: boolean    // WARNING: FE only
    canceled: boolean
    paid: boolean
    imminent: boolean   // WARNING: FE only
    expired: boolean    // WARNING: FE only (checks through date, offline & online)
}

/**
 *
 */
export interface scheduleMapExtended extends scheduleMap {
    user?: userMap,
    station?: stationMap
    color?: string,
    className?: string
}

/**
 *
 */
export interface scheduleMapBackground {
    start :string,
    end :string,
    display :string,
    className :string,
}

/**
 *
 * icon - svg custom icon
 * capacity - TODO infinite if not specified
 */
export interface stationMap {
    id: string
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    label: string
    gallery?: mediaChunkMap[]
    capacity?: number
    order?: number
    lang: string
}

/**
 *
 */
export interface gameMap {
    id :string
    slug: string
    title :string
    author?: string
    description?: string
    categories :string[]
    stationIds :string[]
    tags :string[]
    image?: mediaChunkMap
    coverFront?: mediaChunkMap
    coverSpine?: mediaChunkMap
    gallery?: mediaChunkMap[]
    // TODO CHECK INFO:
    maxPlayersOffline?: number
    maxPlayersOnline?: number
    familyFriendly?: boolean
    motionSickness?: number // 1 to 5
    difficulty?: number     // 1 to 5
    duration?: number       // milliseconds
    minAge?: number         // 1 to 99
}

/**
 * Extension of gameMap with all data joined
 * TODO categories & tags
 */
export interface gameMapExtended extends gameMap {
    stations?: stationMap[],
    durationText?: string
}

/**
 * scheduleRecords      - schedules (input: server, fullcalendar, user bookings)
 * scheduleArchive      - archive with clones of scheduleRecords for comparation purposes
 * users                - users (all)
 * stations             - gaming stations (languages)
 * games                - games (all) (languages)
 * info                 - infoChunk of data (languages, but language key merged with branch key)
 *      - games: parameters of gameMapExtended to use in filters, sort, etc
 *      - users: same as above, for userMap
 *      - categories: game categories
 * scheduleTimeStep         - minimum time slot (example: 1800000 milliseconds = 1800 seconds = 30 min)
 * scheduleEditableSteps    - schedule is editable\removable until 1 hour from current time (example: 1 step = 30 min)
 * scheduleImminentSteps    - schedule that is incoming and need to be notified to user (example: 48 step = 1 day)
 * scheduleTimeCost         - payment for each step. (example: 0 = default 5.00€, 1 step (half hour) special price 6.00€, no 2 step price = default price)
 */
export interface stateEcommerceMap {
    scheduleRecords: Record<string, scheduleMap>
    scheduleArchive: Record<string, scheduleMap>
    users: Record<string, userMap>
    stations: Record<string, Record<string, stationMap>>
    games: Record<string, Record<string, gameMap>>
    info: Record<string, Record<string, infoChunkMap>>
    scheduleTimeStep: number
    scheduleEditableSteps :number
    scheduleImminentSteps :number
    /**
     * payment for each step.
     * 0 = default 5.00€, 1 step 5€, 2 step special price 7€, 3 step no special price = default price * 3, etc
     */
    scheduleTimeCost :Record<number, number>
}