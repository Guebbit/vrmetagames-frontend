export type BusinessHoursMap = Array<[string, string] | []>

export interface toastMap {
    id :string
    color ?: string
    variant ?:string
    title ?:string
    text ?:string
    timeout ?:number
}

export interface stateMainMap {
    businessHours: BusinessHoursMap
    forceClose: boolean
    forceOpen: boolean
    toasts: toastMap[]
    loading :string[]
    loaded :string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastUpdate :Record<string, any | number>    // Record<string, number> | number
    refresh :Record<string, number>
}
