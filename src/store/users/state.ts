export default {
    paymentMethods:{
        paypal1: {
            id: "paypal1",
            name: "Nome Proprietario",
            logo: "https://assets.guebbit.com/vrmetagames/images/logo/PayPal.svg",
            background: "#ffff33",
            color: "#000000",
            cardEmail: "guerzoni.andrea91@gmail.com",
            cardExpire: "10/25",
        },
        mastercard1: {
            id: "mastercard1",
            name: "Nome Proprietario",
            logo: "https://assets.guebbit.com/vrmetagames/images/logo/MasterCard.svg",
            background: "#f0f0f0",
            color: "#231F20",
            cardNumber: "5200828282828210"
        }
    },
    payments: {
        item1: {
            id: 'item-1',
            type: '',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        },
        item2: {
            id: 'item-2',
            type: 'paypal',
            code: '6456754965',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        },
        item3: {
            id: 'item-3',
            type: 'credit-card',
            code: '435634GG',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        },
        item4: {
            id: 'item-4',
            type: 'credit-card',
            code: '1050017AS',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        },
        item5: {
            id: 'item-5',
            type: '',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        },
        item6: {
            id: 'item-6',
            type: 'paypal',
            code: '345364853',
            datetime: 1649620712000,
            total: 50,
            currency: '€'
        }
    }
}