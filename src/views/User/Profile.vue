<template>
    <div id="ProfilePage" class="theme-page">
        <Panel class="theme-panel"
               height="40vh"
               shadow="#000000"
               :shadow-opacity="0.7"
               centered
               strict
               hero
        >
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

		<section class="theme-section">
			<v-container>
				<v-toolbar
					class="px-6 mb-5"
					color="surface"
					dark
					prominent
					dense
				>
					<font-awesome-icon class="mr-4" size="xl" :icon="['fas', 'user']"/>
					<v-toolbar-title>{{ t('profile-page.title') }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn
						icon
						:elevation="0"
						@click = "formToggleEdit = !formToggleEdit"
					>
						<font-awesome-icon :icon="['fas', 'pen']" />
					</v-btn>
				</v-toolbar>
				<v-defaults-provider :defaults="profileUserFormUIRules">
					<v-row>
						<v-col cols="12" md="12" lg="4">
							<v-card>
								<div class="pa-5">
									<div class="d-flex justify-space-between align-center flex-wrap">
										<div class="d-flex align-center">
											<!-- TODO possibilità di cambiarlo -->
											<v-avatar size="64" class="me-4">
												<v-img :src="selectedUser?.avatar?.src ? selectedUser?.avatar?.src : defaultUserAvatarSrc" />
											</v-avatar>
											<div>
												<h4 class="font-600">{{ formValues.username }}</h4>
												<p class="mb-0 grey--text text--darken-1 text-disabled">
													{{ isAdmin ? t('generic.admin') : t('generic.user') }}
												</p>
											</div>
										</div>
										<v-btn
											icon
											color="secondary"
											disabled
										>
											<font-awesome-icon :icon="['fas', 'camera']" />
										</v-btn>
									</div>
								</div>
							</v-card>
						</v-col>
						<v-col cols="6" sm="6" md="3" lg="2">
							<v-card
								class="waiting-class-default-provider"
								max-width="100%"
							>
								<h3 class="font-600 primary--text mb-0"><small>Coming Soon</small></h3>
								<p class="mb-0 text-12 grey--text text--darken-1">{{ t('profile-page.total-hours-played') }}</p>
							</v-card>
						</v-col>
						<v-col cols="6" sm="6" md="3" lg="2">
							<v-card
								class="waiting-class-default-provider"
								max-width="100%"
							>
								<h3 class="font-600 primary--text mb-0">{{ selectedUser?.wallet }}</h3>
								<p class="mb-0 text-12 grey--text text--darken-1">{{ t('profile-page.total-hours-wallet') }}</p>
							</v-card>
						</v-col>
						<v-col cols="6" sm="6" md="3" lg="2">
							<v-card
								class="waiting-class-default-provider"
								max-width="100%"
							>
								<h3 class="font-600 primary--text mb-0">10</h3>
								<p class="mb-0 text-12 grey--text text--darken-1">Lorem ipsum</p>
							</v-card>
						</v-col>
						<v-col cols="6" sm="6" md="3" lg="2">
							<v-card
								class="waiting-class-default-provider"
								max-width="100%"
							>
								<h3 class="font-600 primary--text mb-0">99</h3>
								<p class="mb-0 text-12 grey--text text--darken-1">Lorem Ipsum</p>
							</v-card>
						</v-col>
						<v-col cols="12">
							<v-card class="pa-5" color="primary">
								<v-form>
									<v-row>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.username"
												:label="t('user-data-form.values.username')"
												:placeholder="t('user-data-form.info.username-typing')"
												:disabled="!formToggleEdit"
												:loading="formAsyncUsernameLoading"
												:error="formToggleUIErrors ? formErrors.username || !formAsyncUsernameValid : false"
												:error-messages="
												formToggleUIErrors ?
													formErrors.username ?
														t('user-data-form.errors.username-' + formErrors.username) :
														!formAsyncUsernameValid ?
															t('user-data-form.errors.username-already-used') :
															'' :
														''
											"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'gamepad']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.email"
												:label="t('user-data-form.values.email')"
												autocomplete="email"
												:disabled="!formToggleEdit"
												:loading="formAsyncEmailLoading"
												:error="formToggleUIErrors ? formErrors.email || !formAsyncEmailValid : false"
												:error-messages="
												formToggleUIErrors ?
													formErrors.email ?
														t('user-data-form.errors.email-' + formErrors.email) :
														!formAsyncEmailValid ?
															t('user-data-form.errors.email-already-used') :
															'' :
														''
											"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'envelope']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" v-show="formToggleEdit">
											<div class="text-center">
												<v-btn
													class="ml-7"
													@click="formToggleEditPassword = !formToggleEditPassword"
												>
													{{ formToggleEditPassword ? t('profile-page.hide-password-section') : t('profile-page.show-password-section') }}
												</v-btn>
											</div>
											<v-row
												v-show="formToggleEditPassword"
												justify="center"
												align="center"
											>
												<v-col cols="12" md="6">
													<v-text-field
														v-model="formValues.password"
														class="mb-5"
														:label="t('user-data-form.values.password')"
														:type="formToggleShowPassword ? 'text' : 'password'"
														:disabled="!formToggleEdit"
														:error="formToggleUIErrors ? formErrors.password : false"
														:error-messages="formToggleUIErrors && formErrors.password ? t('form-password-strong.' + formErrors.password) : ''"
													>
														<template v-slot:append-inner>
															<font-awesome-icon
																class="v-icon v-icon--size-default v-icon--start cursor-pointer"
																:icon="formToggleShowPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
																@click="formToggleShowPassword = !formToggleShowPassword"
															/>
														</template>
													</v-text-field>
													<v-text-field
														v-model="formValues.passwordConfirm"
														:label="t('user-data-form.values.passwordConfirm')"
														:type="formToggleShowPassword ? 'text' : 'password'"
														:disabled="!formToggleEdit"
														:error="formToggleUIErrors ? formErrors.passwordConfirm : false"
														:error-messages="formToggleUIErrors && formErrors.passwordConfirm ? t('user-data-form.errors.passwordConfirm-' + formErrors.passwordConfirm) : ''"
													>
														<template v-slot:append-inner>
															<font-awesome-icon
																class="v-icon v-icon--size-default v-icon--start cursor-pointer"
																:icon="formToggleShowPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
																@click="formToggleShowPassword = !formToggleShowPassword"
															/>
														</template>
													</v-text-field>
												</v-col>
												<v-col cols="12" md="6">
													<v-list
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
																	class="v-icon"
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
												</v-col>
											</v-row>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="name" -->
											<v-text-field
												v-model="formValues.firstname"
												:label="t('user-data-form.values.firstname')"
												:disabled="!formToggleEdit"
												:error="formToggleUIErrors ? formErrors.firstname : false"
												:error-messages="formToggleUIErrors && formErrors.firstname ? t('user-data-form.errors.firstname-' + formErrors.firstname) : ''"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'user-pen']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="???" -->
											<v-text-field
												v-model="formValues.lastname"
												:label="t('user-data-form.values.lastname')"
												:disabled="!formToggleEdit"
												:error="formToggleUIErrors ? formErrors.lastname : false"
												:error-messages="formToggleUIErrors && formErrors.lastname ? t('user-data-form.errors.lastname-' + formErrors.lastname) : ''"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'user-pen']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.phone"
												:label="t('user-data-form.values.phone')"
												autocomplete="tel"
												:disabled="!formToggleEdit"
												:error="formToggleUIErrors ? formErrors.phone : false"
												:error-messages="formToggleUIErrors && formErrors.phone ? t('user-data-form.errors.phone-' + formErrors.phone) : ''"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'phone']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="???" -->
											<v-text-field
												v-model="formValues.birthday"
												type="date"
												:disabled="!formToggleEdit"
												:label="t('user-data-form.values.birthday')"
												:error="formToggleUIErrors ? formErrors.birthday : false"
												:error-messages="formToggleUIErrors && formErrors.birthday ? t('user-data-form.errors.birthday-' + formErrors.birthday) : ''"
											>
												<template v-slot:prepend>
													<font-awesome-icon :icon="['fas', 'calendar']" />
												</template>
											</v-text-field>
										</v-col>
										<v-col cols="12" md="6" v-show="formToggleEdit">
											<v-checkbox
												v-model="formValues.terms"
												class="text-secondary"
												:error="formToggleUIErrors ? formErrors.terms : false"
												:error-messages="formToggleUIErrors && formErrors.terms ? t('user-data-form.errors.terms-' + formErrors.terms) : ''"
											>
												<template #label>
													<span v-html="t('user-data-form.info.terms')"></span>
												</template>
											</v-checkbox>
										</v-col>
										<v-col cols="12" md="6">
											<v-textarea
												v-show="isAdmin"
												:label="t('user-data-form.values.admin-info')"
												:value="formValues.adminInfo"
												counter
											>
												<template v-slot:prepend>
													<font-awesome-icon class="v-icon v-icon--size-default v-icon--start" :icon="['fas', 'info']" />
												</template>
											</v-textarea>
										</v-col>
										<v-col cols="12" md="6">
											TODO: aggiungere gruppi\gradi con diversi range di prezzi

											TODO GIOCHI:
											filtro obbligatorio PER POSTAZIONI al posto del cerca
											il cerca di fianco ai SORT
											+ filtro tags
										</v-col>
									</v-row>

									<v-btn
										v-show="formToggleEdit"
										class="w-100"
										color="secondary"
										@click="formSubmit"
									>
										{{ t('user-data-form.submit-signup') }}
									</v-btn>
								</v-form>
							</v-card>
						</v-col>
					</v-row>
				</v-defaults-provider>
			</v-container>
		</section>

		<section class="theme-section">
			<v-container>
				<v-toolbar
					class="px-6 mb-5"
					color="surface"
					dark
					prominent
					dense
				>
					<font-awesome-icon class="mr-4" size="xl" :icon="['fas', 'coins']"/>
					<v-toolbar-title>{{ t('profile-page.user-payments-list') }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn
						icon
						class="icon-add-plus"
						:elevation="0"
						@click="showWalletDialog = true;"
					>
						+
						<font-awesome-icon :icon="['fas', 'wallet']" />
					</v-btn>
					<v-btn
						icon
						class="icon-add-plus"
						:elevation="0"
						@click="selectedPaymentMethodId = undefined; showPaymentMethodDialog = true;"
					>
						+
						<font-awesome-icon :icon="['fas', 'credit-card']" />
					</v-btn>
				</v-toolbar>
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
									:background = "creditCard.cardBackground"
									:color = "creditCard.cardColor"
									:cardNumber = "creditCard.cardNumber"
									:cardEmail = "creditCard.cardEmail"
									:cardExpire = "creditCard.cardExpire"

									@click="selectTargetPaymentMethod(creditCard.id); showPaymentMethodDialog = true;"
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
										:icon="paymentMethods[item.methodId] ? paymentMethods[item.methodId].icon : ['fas', 'coins']"
										:color="paymentMethods[item.methodId] ? paymentMethods[item.methodId].iconColor : themeColors.primary"
									/>

									<h4 class="font-600 text-left d-none d-sm-block">{{ item.code ? item.code : t('profile-page.payment-local')}}</h4>

									<v-spacer />

									<p class="mr-10 text-secondary">
										<b>{{ item.total }}{{ item.currency }}</b>
									</p>

									<p class="text-disabled">{{ translateTimestampToString(item.time) }}</p>
									<font-awesome-icon class="px-5" :icon="['fas', 'arrow-right']" />
								</div>
							</v-card>
						</v-defaults-provider>
					</v-col>
				</v-row>
			</v-container>
		</section>

        <section class="theme-section">
			<v-container>
				<div class="schedule-list">
					<!-- TODO controlli, riordinamenti, etc -->
					<v-toolbar
						class="px-6 mb-5"
						color="surface"
						dark
						prominent
						dense
					>
						<font-awesome-icon class="mr-4" size="xl" :icon="['fas', 'calendar-check']"/>
						<v-toolbar-title>{{ t('profile-page.user-schedule-list') }}</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
					<div v-show="scheduleList.length < 1">
						<h3 class="simple-text-icon d-inline-flex">
							<font-awesome-icon :icon="['fas', 'circle-info']" />
							{{ t('profile-page.schedule-list-empty') }}
						</h3>
					</div>
					<v-row v-show="scheduleList.length > 0">
						<v-col cols="12" lg="3">
							<v-list
								class="schedule-legend bg-transparent"
								variant="text"
							>
								<v-list-item
									v-for="({ variant, icon, color, title, description }, index) in statusListLegenda"
									:key="'schedule-chip-' + index"
									class="mb-2"
								>
									<v-chip
										:color="color"
										:variant="variant"
										size="small"
									>
										<font-awesome-icon class="mr-3" :icon="['fas', icon]"/>
										{{ title }}
									</v-chip>
									<p class="explanation ml-4 mt-2">{{ description }}</p>
								</v-list-item>
							</v-list>
						</v-col>
						<v-col cols="12" lg="9">
							<EventCard
								v-for="{ id } in scheduleList"
								class="cursor-pointer"
								:key="'event-onhold-' + id"
								:id="id"
								:admin="isAdmin"
								:dateFormat="uiFormatDate"
								:timeFormat="uiFormatTime"
								mini

								@click="scheduleSelect(id)"
								@click:button:confirm="showConfirmDialog = true"
								@click:button:cancel="showDeleteDialog = true"
								@click:button:renew="showRenewDialog = true"
							/>
						</v-col>
					</v-row>
				</div>
			</v-container>
		</section>

		<DialogInfoPayment
			:modelValue="!!selectedPaymentId"
			@update:modelValue="(value) => selectedPaymentId = value"
			:id="selectedPaymentId"
			:dateFormat="uiFormatDate"
			:timeFormat="uiFormatTime"

			@click:button:method="(value) => { selectedPaymentId = false; selectTargetPaymentMethod(value); showPaymentMethodDialog = true; }"
		/>

		<DialogInfoPaymentMethod
			v-model="showPaymentMethodDialog"
			:id="selectedPaymentMethodId"
		/>

		<DialogAddWallet
			v-model="showWalletDialog"
		/>

		<Footer
			:primary="themeColors.primary"
			:secondary="themeColors.secondary"
		/>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, toRefs, onMounted } from "vue";
import { useStore } from "@/store";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import useItemDetails from "@/resources/composables/useItemDetails";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import EventCard from "@/components/generic/cards/EventCard.vue";
import CreditCard from "guebbit-vue-library/src/components/cards/CreditCard.vue";
import DialogInfoPayment from "@/components/users/DialogInfoPayment.vue";
import DialogInfoPaymentMethod from "@/components/users/DialogInfoPaymentMethod.vue";
import Footer from "@/components/generic/Footer.vue";
import { defaultUserAvatarSrc, scheduleStates, uiFormatDate, uiFormatTime, userMinAge } from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faUser, faArrowRight, faCreditCard, faWallet, faCoins, faCalendar, faPhone, faEnvelope, faUserPen, faCamera, faGamepad, faInfo } from "@fortawesome/free-solid-svg-icons";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import useFormDataUser from "@/resources/composables/useFormDataUser";
import type { userInfoFormMap } from "@/interfaces";
import { formRules } from "@/resources/composables/useFormStructure";
import DialogAddWallet from "@/components/users/DialogAddWallet.vue";

library.add(faPen, faUser, faArrowRight, faCreditCard, faWallet, faCoins, faCcPaypal, faCalendar, faPhone, faEnvelope, faUserPen, faCamera, faGamepad, faInfo)

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, commit, dispatch } = useStore();

const { paymentMethods, paymentRecords, userInfo } = toRefs(state.user);
const { users, scheduleRecords } = toRefs(state.ecommerce);

const props = defineProps({
	id: {
		type: String,
		required: false
	},
});

/**
 * DATA
 */

const {
	translateTimestampToString,
} = useTimeHelpers(uiFormatDate + ' ' + uiFormatTime);

const {
	isAdmin,
	selectedIdentifier :selectedPaymentMethodId,
	selectTargetRecord: selectTargetPaymentMethod
} = useItemDetails(paymentMethods);

const {
	selectedIdentifier :selectedPaymentId,
	selectTargetRecord: selectTargetPayment
} = useItemDetails(paymentRecords);

const {
	selectTargetRecord: selectTargetUser,
	selectedRecord: selectedUserOriginal
} = useItemDetails(
	users,
	Promise.resolve(),
	{
		userIdParam: 'id'
	}
);

const selectedUser = computed(() => isAdmin ? selectedUserOriginal.value : userInfo.value);
onMounted(() => {
	if(isAdmin && props.id)
		selectTargetUser(props.id)
	if(isAdmin && !props.id)
		selectTargetUser(userInfo.value.id)
});


/**
 * FORM
 */
const formValues = ref<userInfoFormMap>({});

// registration
const formUserInfoSchema = yup.object({
	username: formRules.required,
	firstname: formRules.required,
	lastname: formRules.required,
	// password: formRules.password,
	// passwordConfirm: formRules.passwordConfirm,
	email: formRules.email,
	phone: formRules.required,
	birthday: yup.date()
		.typeError('invalid')
		// minimo 6 anni TODO ASK
		.test('DOB', 'too-early', (date) => !date ? false : new Date().getFullYear() - date.getFullYear() >= userMinAge)
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
	formPasswordValid,
	formPasswordErrors,
	formPasswordRules,
	formToggleShowPassword
} = useFormDataUser<userInfoFormMap>(
	formValues,
	formUserInfoSchema,
	true,
	true
);

/**
 * This is the profile page, all necessary info should be already there
 */
formToggleUIErrors.value = true;
formAsyncUsernameValid.value = true;
formAsyncEmailValid.value = true;

/**
 * Extended formIsValid
 *  - check that username and email are VALID and UNIQUE
 *  - check that password is VALID if password change was requested
 *    (password is out of formValue schema)
 */
const formIsValid = computed(() =>
		formIsValidOriginal.value &&
		formAsyncUsernameValid.value &&
		formAsyncEmailValid.value &&
		(
			(
				formToggleEditPassword.value &&
				formPasswordValid.value
			) ||
			!formToggleEditPassword.value
		)
);



/**
 * Reset form
 * Need to reset the validation too.
 */
const formReset = () => {
	formValues.value = {
		username: selectedUser.value?.username,
		firstname: selectedUser.value?.firstname,
		lastname: selectedUser.value?.lastname,
		password: '',
		passwordConfirm: '',
		email: selectedUser.value?.email,
		phone: selectedUser.value?.phone,
		birthday: translateTimestampToString(selectedUser.value?.birthday, 'YYYY-MM-DD'),
		adminInfo: selectedUser.value?.adminInfo,
		terms: false
	}
	formValidate();
};
onMounted(() => formReset());


/**
 * Submit form, edit current user
 */
const formSubmit = () => {
	// errors check
	if(!formIsValid.value)
		return;
	// submit
	dispatch('user/userEdit', {
		...formValues.value,
		id: selectedUser.value?.id
	}).catch((errors = []) => {
		for(let i = errors.length; i--; )
			commit("addToast", {
				color: 'error',
				title: 'Error',
				text: errors[i],
				timeout: 5000
			});
	})
}


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
 * TOGGLES
 */
const showWalletDialog = ref(false);
const showPaymentMethodDialog = ref(false);
const formToggleEdit = ref(false);
const formToggleEditPassword = ref(false);




/**
 * Schedule history of user
 * (ALL past events of user)
 *
 */
const scheduleList = computed(() =>
	Object.values(scheduleRecords.value).filter(({ start, userId }) => userId === userInfo.value.id && start < Date.now())
);


// ---------------- UI ----------------
/**
 * Legenda of the different statuses of schedule
 * (no computed because it's the translation of a constant)
 */
const statusListLegendaRaw = Object.values(scheduleStates);
const statusListLegenda = [];
for(let i = statusListLegendaRaw.length; i--; )
	statusListLegenda.push({
		...statusListLegendaRaw[i],
		title: t(statusListLegendaRaw[i].title),
		description: t(statusListLegendaRaw[i].description)
	})

const profileUserFormUIRules = computed(() => {
	return {
		VTextField: {
			variant: formToggleEdit.value ? 'solo' : 'plain',
			hideDetails: 'auto'
		},
		VTextarea: {
			variant: 'solo'
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
	}
});
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
}
</style>