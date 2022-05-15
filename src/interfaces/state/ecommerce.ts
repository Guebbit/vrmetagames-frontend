export interface scheduleMap {
    [key :string] :any  // TODO
}

export interface userMap {
    id: string
    avatar: string
    username: string
}

// available true, time = tra quanto NON sarà più disponibile / per quanto sarà disponibile (?)
// available false, time = tra quanto sarà disponbiile
export interface stationMap {
    id: string
    type: string
    image: string
    available :boolean
    time :number
    number :number
}

export interface gameMap {
    id: string
    title: string
    author: string
    image: string
}

export interface stateEcommerceMap {
    scheduleList: Record<string, scheduleMap>
    temporarySchedule: scheduleMap
    users: Record<string, userMap>
    stations: Record<string, stationMap>
    games: Record<string, gameMap>
}