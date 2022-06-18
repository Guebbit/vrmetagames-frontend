/**
 * SCHEDULE TYPES:
 *
 * ONLINE
 *  - false: only on client, lost on closing (confirmed:false only)
 *  - true: online (can be confirmed or not (on hold))
 * CONFIRMED
 *  - false: awaiting payment (online:true only)
 *  - true: payment done, final stage (online:true only)
 * UNSAVED
 *  - false: normal situation
 *  - true: unsaved (offline) changes on event
 *  - online true + unsaved true = means the event is already online but user have unsaved edits
 * CANCELED
 *  - false: normal situation
 *  - true: a previously CONFIRMED schedule that has been canceled (online:true & confirmed:false only)
 */
export interface scheduleInputMap {
    start: number
    end: number
    allDay: boolean
    resourceId?: string
}

export interface scheduleMap extends scheduleInputMap {
    id :string
    userId :string
    online :boolean     // WARNING: FE only
    confirmed :boolean
    unsaved: boolean     // WARNING: FE only
    canceled: boolean
}

export interface userMap {
    id: string
    avatar: string
    username: string
    lastVisit: number
    color: string // color assigned to user in current session (fullcalendar event color)
    // admin options
    wallet ?:number
}

export interface stationMap {
    id: string
    type: string
    label: string
    image: string
    capacity :number
}

export interface gameMap {
    id: string
    title: string
    author: string
    image: string
}


/**
 *
 * scheduleRecords      - schedules (fullcalendar, user bookings)
 * users                - users
 * stations             - stations
 * games                - games
 * scheduleTimeStep     - minimum time slot
 * scheduleEditableTime - schedule is editable\removable until 1 hour from current time
 */
export interface stateEcommerceMap {
    scheduleRecords: Record<string, scheduleMap>
    users: Record<string, userMap>
    stations: Record<string, stationMap>
    games: Record<string, gameMap>
    scheduleTimeStep: number
    scheduleEditableTime :number
}