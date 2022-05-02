// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04

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

export interface gameMap{
    id: string
    title: string
    author: string
    image: string
}

export interface stateMainMap {
    modals :Record<string,boolean>
    businessHours :string[][]
}

export interface stateEcommerceMap {
    games: {
        [key :string]: gameMap
    }
}

export interface stateUserMap {
    currentUserInfo: {
        avatar: string
        name: string
        username: string
        email: string
        phone: string
        birthdate: number
        description: string
    },
    paymentMethods: {
        [key :string]: paymentMethodMap
    }
    payments: {
        [key :string]: paymentMap
    }
}

export interface stateRootMap {
    main: stateMainMap,
    user: stateUserMap,
    ecommerce: stateEcommerceMap
}



