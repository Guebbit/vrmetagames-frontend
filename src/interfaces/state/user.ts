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
    isAdmin: boolean
}

export interface stateUserMap {
    userInfo: currentUserMap,
    paymentMethods: Record<string, paymentMethodMap>
    payments: Record<string, paymentMap>
}
