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
                    :color="themeColors.primary"
                    :double="themeColors.secondary"
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
            <template v-slot:background>
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
            <v-defaults-provider :defaults="profileUserFormUIRules">
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
                                            <v-img :src="userInfo.avatar || defaultUserAvatar" />
                                        </v-avatar>
                                        <div>
                                            <h4 class="font-600">{{ formValues.username }}</h4>
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
							<v-form>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="formValues.username"
											:label="t('authentication-formValues.values.username')"
											:placeholder="t('authentication-formValues.info.username-typing')"
											:loading="formAsyncUsernameLoading"

											:errors="formToggleUIErrors ? formErrors.username || !formAsyncUsernameValid : false"
											:error-messages="
												formToggleUIErrors ?
													formErrors.username ?
														t('authentication-formValues.errors.username-' + formErrors.username) :
														!formAsyncUsernameValid ?
															t('authentication-formValues.errors.username-already-used') :
															'' :
														''
											"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="formValues.password"
											:label="t('authentication-formValues.values.password')"
											:type="formToggleShowPassword ? 'text' : 'password'"
											:errors="formToggleUIErrors ? formErrors.password : false"
											:error-messages="formToggleUIErrors && formErrors.password ? t('authentication-formValues.password-strong.' + formErrors.password) : ''"
										>
											<template v-slot:append>
												<v-btn icon
													variant="text"
													@click="formToggleShowPassword = !formToggleShowPassword"
												>
													<font-awesome-icon :icon="formToggleShowPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
												</v-btn>
											</template>
										</v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="formValues.passwordConfirm"
											:label="t('authentication-formValues.values.passwordConfirm')"
											:type="formToggleShowPassword ? 'text' : 'password'"
											:errors="formToggleUIErrors ? formErrors.passwordConfirm : false"
											:error-messages="formToggleUIErrors && formErrors.passwordConfirm ? t('authentication-formValues.errors.passwordConfirm-' + formErrors.passwordConfirm) : ''"
										>
											<template v-slot:append>
												<v-btn icon
													variant="text"
													@click="formToggleShowPassword = !formToggleShowPassword"
												>
													<font-awesome-icon :icon="formToggleShowPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
												</v-btn>
											</template>
										</v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-model="formValues.email"
											:label="t('authentication-formValues.values.email')"
											autocomplete="email"
											:loading="formAsyncEmailLoading"
											:errors="formToggleUIErrors ? formErrors.email || !formAsyncEmailValid : false"
											:error-messages="
												formToggleUIErrors ?
													formErrors.email ?
														t('authentication-formValues.errors.email-' + formErrors.email) :
														!formAsyncEmailValid ?
															t('authentication-formValues.errors.email-already-used') :
															'' :
														''
											"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<!-- autocomplete="name" -->
										<v-text-field
											v-model="formValues.firstname"
											:label="t('authentication-formValues.values.firstname')"
											:errors="formToggleUIErrors ? formErrors.firstname : false"
											:error-messages="formToggleUIErrors && formErrors.firstname ? t('authentication-formValues.errors.firstname-' + formErrors.firstname) : ''"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<!-- autocomplete="???" -->
										<v-text-field
											v-model="formValues.lastname"
											:label="t('authentication-formValues.values.lastname')"
											:errors="formToggleUIErrors ? formErrors.lastname : false"
											:error-messages="formToggleUIErrors && formErrors.lastname ? t('authentication-formValues.errors.lastname-' + formErrors.lastname) : ''"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="formValues.phone"
											:label="t('authentication-formValues.values.phone')"
											autocomplete="tel"
											:errors="formToggleUIErrors ? formErrors.phone : false"
											:error-messages="formToggleUIErrors && formErrors.phone ? t('authentication-formValues.errors.phone-' + formErrors.phone) : ''"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<!-- autocomplete="???" -->
										<v-text-field
											v-model="formValues.birthday"
											type="date"
											:label="t('authentication-formValues.values.birthday')"
											:errors="formToggleUIErrors ? formErrors.birthday : false"
											:error-messages="formToggleUIErrors && formErrors.birthday ? t('authentication-formValues.errors.birthday-' + formErrors.birthday) : ''"
										/>
									</v-col>
									<v-col cols="12">
										<v-checkbox
											v-model="formValues.terms"
											class="text-secondary"
											:errors="formToggleUIErrors ? formErrors.terms : false"
											:error-messages="formToggleUIErrors && formErrors.terms ? t('authentication-formValues.errors.terms-' + formErrors.terms) : ''"
										>
											<template #label>
												<span v-html="t('authentication-formValues.info.terms')"></span>
											</template>
										</v-checkbox>
									</v-col>
								</v-row>
								<v-list
									v-show="formPasswordErrors.length > 0 && !formPasswordErrors.includes('required')"
									class="password-lacking-list bg-transparent mb-5"
									density="compact"
								>
									<v-list-item
										v-for="(label, rule) in formPasswordRules"
										:key="'rule-' + rule"
									>
										{{ label }}
										<template v-slot:prepend>
											<font-awesome-icon
												class="mr-5"
												:style="{
														color: formPasswordErrors.includes(rule) ? themeColors.error : themeColors.success
													}"
												:icon="formPasswordErrors.includes(rule) ?
														['fas', 'triangle-exclamation'] :
														['fas', 'circle-check']"
											/>
										</template>
									</v-list-item>
								</v-list>

								<v-btn
									class="w-100"
									color="secondary"
									@click="formSubmit"
								>
									{{ t('authentication-formValues.submit-signup') }}
								</v-btn>
							</v-form>
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

								@click="selectTargetPaymentMethod(creditCard.id)"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="9" md="9" lg="10">
                    <v-defaults-provider :defaults="paymentHistoryUIRules">
                        <v-card
							v-for="item in paymentRecords"
							:key="'payment-history-' + item.id"
							class="waiting-class-default-provider-2"
							@click="selectTargetPayment(item.id)"
                        >
                            <div class="d-flex justify-space-between align-center">
                                <font-awesome-icon
                                    class="px-3"
                                    size="2x"
                                    :icon="paymentTypeIcon(item.type)"
                                    :color="paymentTypeColor(item.type)"
                                />

                                <h4 class="font-600 text-left d-none d-sm-block">{{ item.code ? item.code : t('profile-page.payment-local')}}</h4>

								<v-spacer />

								<p class="mr-10 text-secondary">
									<b>{{ item.total }}{{ item.currency }}</b>
								</p>

								<p class="text-disabled">{{ formatUIDate(item.time) }}</p>
                                <font-awesome-icon class="px-5" :icon="['fas', 'arrow-right']" />
                            </div>
                        </v-card>
                    </v-defaults-provider>
                </v-col>
            </v-row>
        </v-container>

		<DialogInfoPayment
			:modelValue="!!selectedPaymentId"
			@update:modelValue="(value) => selectedPaymentId = value"
			:id="selectedPaymentId"
			:dateFormat="uiFormatDate"
			:timeFormat="uiFormatTime"

			@button:click:method="(value) => { selectTargetPaymentMethod(value); selectedPaymentId = false; }"
		/>

		<DialogInfoPaymentMethod
			:modelValue="!!selectedPaymentMethodId"
			@update:modelValue="(value) => selectedPaymentMethodId = value"
			:id="selectedPaymentMethodId"
		/>

		<Footer
			:primary="themeColors.primary"
			:secondary="themeColors.secondary"
		/>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch, toRefs, onMounted } from "vue";
import { useStore } from "@/store";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { useForm } from 'vee-validate';
import * as yup from "yup";

import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import useCheckDataUniqueness from "@/resources/composables/useCheckDataUniqueness";
import DialogInfoPayment from "@/components/users/DialogInfoPayment.vue";
import DialogInfoPaymentMethod from "@/components/users/DialogInfoPaymentMethod.vue";
import useItemDetails from "@/resources/composables/useItemDetails";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import TrapezoidTitle from "@/components/basics/typography/TrapezoidTitle.vue";
import CreditCard from "guebbit-vue-library/src/components/cards/CreditCard.vue";
import Footer from "@/components/generic/Footer.vue";
import BusinessContactsPanel from "@/components/generic/panels/BusinessContactsPanel.vue";
import { defaultUserAvatar, uiFormatDate, uiFormatTime } from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faUser, faArrowRight, faCartShopping, faCreditCard, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import useFormDataUser from "@/resources/composables/useFormDataUser";
import type { userInfoFormMap } from "@/interfaces";
import { formRules } from "@/resources/composables/useFormStructure";

library.add(faPen, faUser, faArrowRight, faCartShopping, faCreditCard, faCoins, faCcPaypal)

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, commit, dispatch } = useStore();

const { paymentMethods, paymentRecords, userInfo } = toRefs(state.user);


const formValues = ref<userInfoFormMap>({});

// registration
const formUserInfoSchema = yup.object({
	username: formRules.required,
	firstname: formRules.required,
	lastname: formRules.required,
	password: formRules.password,
	passwordConfirm: formRules.passwordConfirm,
	email: formRules.email,
	phone: formRules.required,
	birthday: yup.date()
		.typeError('invalid')
		// minimo 6 anni TODO ASK
		.test('DOB', 'too-early', (date) => !date ? false : new Date().getFullYear() - date.getFullYear() >= 6)
		.required('required'),
	terms: formRules.requiredCheck,
});

const {
	formErrors,
	// formErrorsList,
	formIsValid :formIsValidOriginal,
	formToggleUIErrors,
	formValidate,
	formAsyncUsernameValid,
	formAsyncUsernameLoading,
	formAsyncEmailValid,
	formAsyncEmailLoading,
	formPasswordErrors,
	formPasswordRules,
	formToggleShowPassword
} = useFormDataUser<userInfoFormMap>(
	formValues,
	formUserInfoSchema,
	true,
	true
);


const {
	formatUIDate,
} = useTimeHelpers(uiFormatDate + ' ' + uiFormatTime);

const {
	isAuthenticated,
	isAdmin,
	selectedIdentifier :selectedPaymentMethodId,
	selectTargetRecord: selectTargetPaymentMethod
} = useItemDetails(paymentMethods);

const {
	selectedIdentifier :selectedPaymentId,
	selectTargetRecord: selectTargetPayment
} = useItemDetails(paymentRecords);

// TODO paymentmethods


const paymentTypeIcon = (name :string) => {
	switch (name) {
		case 'paypal':
			return ['fab', 'cc-paypal'];
		case 'credit-card':
			return ['fas', 'credit-card'];
	}
	return ['fas', 'coins'];
}
const paymentTypeColor = (name :string) => {
	switch (name) {
		case 'paypal':
			return '#f0f0f0';
		case 'credit-card':
			return '#ffff33';
	}
	return themeColors.primary;
}


onMounted(() => {
	formValues.value = {
		username: userInfo.value.username,
		firstname: userInfo.value.firstname,
		lastname: userInfo.value.lastname,
		password: '',
		passwordConfirm: '',
		email: userInfo.value.email,
		phone: userInfo.value.phone,
		birthday: userInfo.value.birthday,
		terms: false
	}
})


/*
        birthdateTranslated() {
            return this.translateDate(this.formValues.birthdate.toString())
        }
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
 */


/**
 * UI
 */
const profileUserFormUIRules = {
	global: {
		elevation: 12,
	},
	VTextField: {
		variant: 'solo',
		hideDetails: 'auto'
	},
	VCheckbox: {
		hideDetails: 'auto'
	},
	VCard: {
		color: 'secondary',
		// TODO in attesa che torni a funzionare, uso CSS .waiting-class-default-provider
		// className: 'd-flex flex-column text-center align-center justify-center pa-4',
		height: '100%',
		variant: 'outlined'
	},
};
const paymentHistoryUIRules = {
	global: {
		elevation: 10,
	},
	VCard: {
		color: 'light',
		width: '100%',
		elevation: 12,
		variant: 'outlined'
	},
};
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