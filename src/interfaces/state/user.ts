import type { imageMap } from "@/interfaces";

export interface paymentMethodMap {
    id: string
    name: string
    logo: string
    icon: string | string[]
    iconColor: string
    cardBackground: string
    cardColor: string
    cardNumber: string
    cardEmail: string
    cardExpire: string
}

export interface paymentMap {
    id: string
    methodId: string
    type: string
    code: string
    time: number
    total: number
    currency: string
}

export interface currentUserMap {
    id?: string
    avatar?: imageMap
    username?: string
    firstname?: string
    lastname?: string
    email?: string
    phone?: string
    birthday?: number
    adminInfo?: string
    wallet?: number
    lastVisit?: number
    isAdmin?: boolean
}

export interface stateUserMap {
    jwt :string
    userInfo: currentUserMap
    paymentMethods: Record<string, paymentMethodMap>
    paymentRecords: Record<string, paymentMap>
}
