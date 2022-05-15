export type BusinessHoursMap = Array<[string, string] | []>

export interface stateMainMap {
    businessHours: BusinessHoursMap
    forceClose: boolean
    forceOpen: boolean
    modals: Record<string, boolean>
    loading :string[]
    loaded :string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastUpdate :Record<string, any | number>    // Record<string, number> | number
    refresh :Record<string, number>
}
