export interface paymentMethodMap {
    id: string
    name: string
    logo: string
    background: string
    color: string
    cardEmail: string
    cardExpire: string
}

export interface paymentMap {
    id: string
    type: string
    code: string
    time: number
    total: number
    currency: string
}

export interface currentUserMap {
    id: string
    avatar: string
    username: string
    name: string
    email: string
    phone: string
    birthdate: number
    description: string
    wallet :number
    lastVisit: number
    isAdmin: boolean
}

export interface stateUserMap {
    jwt :string
    userInfo: currentUserMap
    paymentMethods: Record<string, paymentMethodMap>
    paymentRecords: Record<string, paymentMap>
}
