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
export interface scheduleInputMap {
    start: number
    end: number
    allDay: boolean
    id? :string
    resourceId?: string
}

export interface scheduleMap extends scheduleInputMap {
    id :string
    userId :string
    online :boolean      // WARNING: FE only
    confirmed :boolean
    unsaved: boolean     // WARNING: FE only
    canceled: boolean
    paid: boolean
}

export interface userMap {
    id: string;
    avatar: string;
    username: string;
    lastVisit: number;
    // color assigned to user in current session (fullcalendar event color)
    color?: string;
    // admin options
    wallet?: number;
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
 * scheduleTimeCost     - payment for each step. 0 = default 5.00€, 1 step (half hour) special price 6.00€, no 2 step price = default price
 * scheduleTimeStep     - minimum time slot
 * scheduleEditableTime - schedule is editable\removable until 1 hour from current time
 */
export interface stateEcommerceMap {
    scheduleRecords: Record<string, scheduleMap>
    scheduleArchive: Record<string, scheduleMap>
    users: Record<string, userMap>
    stations: Record<string, stationMap>
    games: Record<string, gameMap>
    scheduleTimeStep: number
    scheduleEditableTime :number
    /**
     * payment for each step.
     * 0 = default 5.00€, 1 step 5€, 2 step special price 7€, 3 step no special price = default price * 3, etc
     *
     * TODO IMPORTANT WARNING: I "pack" di sconto da svariate ore dovrebbero essere moltiplicabili.
     *  fare tipo: compri 60 ore, 50 sono con il bonus e 10 sono normali
     */
    scheduleTimeCost :Record<number, number>
}