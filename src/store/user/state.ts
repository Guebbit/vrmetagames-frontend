export default {
    userInfo: {
        id: 'user1',
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        username: "UsernameTonio",
        name: "Tonio Cartonio",
        email: "tonio.cartonio@gmail.com",
        phone: "+39 123 4567",
        birthdate: 1649620712000,
        description: "lorem ipsum blablabla cose a caso",
        isAdmin: false,
    },
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
            code: 'XXXXXXXXX',
            time: 1649620712000,
            total: 50,
            currency: '€'
        },
        item2: {
            id: 'item-2',
            type: 'paypal',
            code: '645675496',
            time: 1649620712000,
            total: 50,
            currency: '€'
        },
        item3: {
            id: 'item-3',
            type: 'credit-card',
            code: '645674965',
            time: 1649620712000,
            total: 50,
            currency: '€'
        },
        item4: {
            id: 'item-4',
            type: 'credit-card',
            code: '1050017AS',
            time: 1649620712000,
            total: 50,
            currency: '€'
        },
        item5: {
            id: 'item-5',
            type: '',
            code: 'XXXXXXXXX',
            time: 1649620712000,
            total: 50,
            currency: '€'
        },
        item6: {
            id: 'item-6',
            type: 'paypal',
            code: '345364853',
            time: 1649620712000,
            total: 50,
            currency: '€'
        }
    }
}