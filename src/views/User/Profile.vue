<template>
    <div id="ProfilePage" class="theme-page">
        <Panel class="theme-panel"
               height="50vh"
               shadow="#000000"
               :shadow-opacity="0.7"
               centered
               strict
               hero
        >
            <template v-slot:default>
                <TrapezoidTitle
                    class="theme-page-title text-center"
                    :color="$vuetify.theme.themes.default.colors.primary"
                    :double="$vuetify.theme.themes.default.colors.secondary"
                    outline
                    big
                    cross
                >
                    My Profile
                </TrapezoidTitle>
                <v-toolbar color="transparent">
                    <v-btn icon color="primary">
                        <font-awesome-icon :icon="['fas', 'pen']" size="2x" />
                    </v-btn>
                    <v-btn icon color="primary">
                        <font-awesome-icon :icon="['fas', 'user']" size="2x" />
                    </v-btn>
                    <v-btn icon color="primary">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" size="2x" />
                    </v-btn>
                    <v-btn icon color="primary">
                        <font-awesome-icon :icon="['fas', 'credit-card']" size="2x" />
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:backgroundImage>
                <v-img
                    cover
                    class="panel-background"
                    lazy-src="http://placekitten.com/100/100"
                    src="http://placekitten.com/2000/1000"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </template>
        </Panel>

        <v-container>
            <v-defaults-provider :defaults="defaultsUserData">
                <v-row class="pb-3">
                    <v-col cols="12" lg="8"></v-col>
                    <v-col cols="12" md="6" offset-md="6" lg="4" offset-lg="8">
                        <v-toolbar>
                            <v-btn icon :elevation="0">
                                <font-awesome-icon :icon="['fas', 'pen']" />
                            </v-btn>
                            <v-spacer></v-spacer>
                            <!-- <v-divider vertical></v-divider> -->
                            <v-btn icon :elevation="0">
                                <font-awesome-icon :icon="['fas', 'user']" />
                            </v-btn>
                            <v-btn icon :elevation="0">
                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                            </v-btn>
                            <v-btn icon :elevation="0">
                                <font-awesome-icon :icon="['fas', 'credit-card']" />
                            </v-btn>
                        </v-toolbar>
                    </v-col>

                    <v-col cols="12" md="12" lg="4">
                        <v-card>
                            <div class="pa-5">
                                <div class="d-flex justify-space-between align-center flex-wrap">
                                    <div class="d-flex align-center">
                                        <v-avatar size="64" class="me-4">
                                            <v-img :src="user.avatar" />
                                        </v-avatar>
                                        <div>
                                            <h4 class="font-600">{{ form.username }}</h4>
                                            <p class="mb-0 grey--text text--darken-1">Qualcosa boh</p>
                                        </div>
                                    </div>
                                    <p class="mb-0 grey--text text--darken-1">AAAAAA</p>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" lg="2">
                        <v-card
                            class="waiting-class-default-provider"
                            max-width="100%"
                        >
                            <h3 class="font-600 primary--text mb-0">16</h3>
                            <p class="mb-0 text-12 grey--text text--darken-1">Ore giocate</p>
                        </v-card>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" lg="2">
                        <v-card
                            class="waiting-class-default-provider"
                            max-width="100%"
                        >
                            <h3 class="font-600 primary--text mb-0">02</h3>
                            <p class="mb-0 text-12 grey--text text--darken-1">Ore disponibili</p>
                        </v-card>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" lg="2">
                        <v-card
                            class="waiting-class-default-provider"
                            max-width="100%"
                        >
                            <h3 class="font-600 primary--text mb-0">10</h3>
                            <p class="mb-0 text-12 grey--text text--darken-1">Quanto sei bello</p>
                        </v-card>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" lg="2">
                        <v-card
                            class="waiting-class-default-provider"
                            max-width="100%"
                        >
                            <h3 class="font-600 primary--text mb-0">01</h3>
                            <p class="mb-0 text-12 grey--text text--darken-1">Qualcosa</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card class="user-form" color="primary">
                            <v-row>
                                <v-col cols="12" sm="6" lg="4">
                                    <v-text-field
                                        v-model="form.name"
                                        label="Nome"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" lg="4">
                                    <v-text-field
                                        v-model="form.username"
                                        :rules="[formRules.required]"
                                        label="Username"
                                        readonly
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" lg="4">
                                    <v-text-field
                                        v-model="form.email"
                                        :rules="[formRules.email]"
                                        label="Email"
                                        class="text-primary"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" lg="4">
                                    <v-text-field
                                        v-model="form.phone"
                                        label="Telefono"
                                        class="text-primary"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" lg="4">
                                    <!-- v-model="form.birthdate" -->
                                    <v-text-field
                                        v-model="birthdateTranslated"
                                        :rules="[formRules.required]"
                                        label="Data di nascita"
                                        class="text-primary"
                                        readonly
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="form.description"
                                        label="Dicci qualcosa di te"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-defaults-provider>
            <v-row>
                <!-- TODO magari un carousel\swiper? -->
                <v-col cols="12" sm="3" md="3" lg="2">
                    <v-row>
                        <v-col v-for = "creditCard in paymentMethods"
                               :key="'payment-method-'+creditCard.id"
                               cols="6" sm="12"
                        >
                            <CreditCard
                                :name = "creditCard.name"
                                :logo = "creditCard.logo"
                                :background = "creditCard.background"
                                :color = "creditCard.color"
                                :cardNumber = "creditCard.cardNumber"
                                :cardEmail = "creditCard.cardEmail"
                                :cardExpire = "creditCard.cardExpire"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="9" md="9" lg="10">
                    <v-defaults-provider :defaults="defaultsPaymentHistory">
                        <v-card v-for="item in payments"
                                :key="'payment-history-' + item.id"
                                class="waiting-class-default-provider-2"
                                to="/order-details"
                        >
                            <div class="d-flex justify-space-between align-center">
                                <font-awesome-icon
                                    class="px-3"
                                    size="2x"
                                    :icon="paymentTypeIcon(item.type)"
                                    :color="paymentTypeColor(item.type)"
                                />
                                <h4 class="font-600">{{ item.code }}</h4>
                                <p>{{ translateDateTime(item.time) }}</p>
                                <p>{{ item.total }}{{ item.currency }}</p>
                                <font-awesome-icon class="px-3" :icon="['fas', 'arrow-right']" />
                            </div>
                        </v-card>
                    </v-defaults-provider>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
// TODO mixin tipo ACcenture
// https://vuejs.org/guide/reusability/composables.html#what-is-a-composable
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { formRules } from "@/resources/constants";

import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import TrapezoidTitle from "@/components/basics/typography/TrapezoidTitle.vue";
import CreditCard from "guebbit-vue-library/src/components/cards/CreditCard.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faUser, faArrowRight, faCartShopping, faCreditCard, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";

library.add(faPen, faUser, faArrowRight, faCartShopping, faCreditCard, faCoins, faCcPaypal)

export default defineComponent({
    name: "ProfileIndex",
    components: {
        Panel,
        TrapezoidTitle,
        CreditCard,
        FontAwesomeIcon
    },
    data: () => {
        return {
            form: {
                name: '',
                username: '',
                email: '',
                phone: '',
                birthdate: 0,
                description: ''
            },
            formRules,
            defaultsUserData: {
                global: {
                    elevation: 12,
                },
                VTextField: {
                    variant: 'contained'
                },
                VTextarea: {
                    variant: 'contained'
                },
                VCard: {
                    color: 'secondary',
                    // TODO in attesa che torni a funzionare, uso CSS .waiting-class-default-provider
                    // className: 'd-flex flex-column text-center align-center justify-center pa-4',
                    height: '100%',
                    variant: 'outlined'
                },
            },
            defaultsPaymentHistory: {
                global: {
                    elevation: 10,
                },
                VCard: {
                    color: 'light',
                    width: '100%',
                    elevation: 12,
                    variant: 'outlined'
                },
            }
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paymentMethods: ({ user: {paymentMethods} } :any) => Object.values(paymentMethods),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            payments: ({ user: {payments} } :any) => Object.values(payments),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user: ({ user: { userInfo } }: any) => userInfo,
        }),

        birthdateTranslated() {
            return this.translateDate(this.form.birthdate.toString())
        }
    },

    methods:{
        translateDate(date :string){
            return new Date(date).toLocaleDateString("en-GB", { // you can use undefined as first argument
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        },
        translateDateTime(date :string){
            return new Date(date).toLocaleDateString("en-GB", { // you can use undefined as first argument
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
        },
        paymentTypeIcon(name :string){
            switch (name) {
                case 'paypal':
                    return ['fab', 'cc-paypal'];
                case 'credit-card':
                    return ['fas', 'credit-card'];
            }
            return ['fas', 'coins'];
        },
        paymentTypeColor(name :string){
            switch (name) {
                case 'paypal':
                    return '#f0f0f0';
                case 'credit-card':
                    return '#ffff33';
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return this.$vuetify.theme.themes.default.colors.primary;
        }
    },
    mounted(){
        this.form = this.user;
    }
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#ProfilePage{
    .theme-panel{
        .v-toolbar{
            &__content{
                display: flex;
                justify-content: space-around;
            }
        }
    }
    .v-card {
        &.waiting-class-default-provider{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 16px;
        }

        &.waiting-class-default-provider-2{
            text-align: center;
            margin: 12px 0;
            padding: 6px;
            &:first-child{
                margin-top: 0;
            }
        }
    }

    .user-form{
        padding: 62px 24px 24px 24px;
    }
}
</style>