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
    datetime: number
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
    businessHours :string[][]
}

export interface stateEcommerceMap {
    games: {
        [key :string]: gameMap
    }
}

export interface stateUserMap {
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



