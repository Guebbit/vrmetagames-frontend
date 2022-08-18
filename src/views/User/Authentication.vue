<template>
    <div id="authentication-page" class="theme-page">
		<v-defaults-provider :defaults="authenticationFormUIRules">
			<v-row no-gutters="">
				<v-col cols="12" md="12" lg="4">
					<Panel class="theme-panel"
						:shadow="themeColors['primary-darken-5']"
						:shadow-opacity="0.95"
						centered
						strict
						hero
					>
						<template #default>
							<div v-show="mode === 'registration'" class="pa-10">
								<p class="text-h5">
									{{ t('authentication-page.signin-explanation') }}
								</p>
								<div class="text-center my-12">
									<BusinessContactsPanel light />
								</div>
								<div class="d-flex justify-space-between align-center">
									<p class="text-h5">
										{{ t('authentication-page.signin-request') }}
									</p>
									<v-btn
										color="secondary"
										:to="{
											name: 'Login'
										}"
									>
										{{ t('authentication-form.switch-to-signin') }}
									</v-btn>
								</div>
							</div>
							<div v-show="mode === 'login'" class="pa-10">
								<p class="text-h5">
									{{ t('authentication-page.signup-explanation') }}
								</p>
								<div class="text-center my-12">
									<BusinessContactsPanel light />
								</div>
								<div class="d-flex justify-space-between align-center">
									<p class="text-h5">
										{{ t('authentication-page.signup-request') }}
									</p>
									<v-btn
										color="secondary"
										:to="{
											name: 'Registration'
										}"
									>
										{{ t('authentication-form.switch-to-signup') }}
									</v-btn>
								</div>
							</div>
							<div v-show="mode === 'password-retrieve'" class="pa-10">
								<div class="text-center my-12">
									<BusinessContactsPanel light />
								</div>
							</div>
						</template>
						<template #background>
							<v-img
								cover
								class="panel-background"
								:src="imagesUrl + 'logo/logotype.svg'"
							>
								<template #placeholder>
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
				</v-col>
				<v-col cols="12" md="12" lg="8">
					<div class="authentication-section">
						<div class="form-container page-menu-padding">
							<v-container>
								<v-form v-if="mode === 'password-retrieve'">
									<h1>COMING SOON</h1>
									<p>Vieni in sede o contattaci telefonicamente</p>
									<v-btn
										class="w-100 mt-10"
										color="primary"
										:to="{ name: 'Login' }"
									>
										Torna indietro
									</v-btn>
								</v-form>
								<!-- Subscribe -->
								<v-form v-else-if="mode === 'registration'">
									<h1 class="text-h2 text-center">
										{{ t('authentication-page.signin') }}
									</h1>
									<p class="text-right mb-10">
										{{ t('authentication-page.signin-request') }}
										<router-link
											class="text-decoration-none"
											:to="{
											name: 'Login'
										}"
										>
											<b class="text-secondary">
												{{ t('authentication-form.switch-to-signin') }}
											</b>
										</router-link>
									</p>

									<v-row>
										<v-col cols="12">
											<v-text-field
												v-model="formValues.username"
												:label="t('authentication-form.values.username')"
												:placeholder="t('authentication-form.info.username-typing')"
												:loading="formAsyncUsernameLoading"

												:error="formToggleUIErrors ? formErrors.username || !formAsyncUsernameValid : false"
												:error-messages="
												formToggleUIErrors ?
													formErrors.username ?
														t('authentication-form.errors.username-' + formErrors.username) :
														!formAsyncUsernameValid ?
															t('authentication-form.errors.username-already-used') :
															'' :
														''
											"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.password"
												:label="t('authentication-form.values.password')"
												:type="formToggleShowPassword ? 'text' : 'password'"
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
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.passwordConfirm"
												:label="t('authentication-form.values.passwordConfirm')"
												:type="formToggleShowPassword ? 'text' : 'password'"
												:error="formToggleUIErrors ? formErrors.passwordConfirm : false"
												:error-messages="formToggleUIErrors && formErrors.passwordConfirm ? t('authentication-form.errors.passwordConfirm-' + formErrors.passwordConfirm) : ''"
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
										<v-col cols="12">
											<v-text-field
												v-model="formValues.email"
												:label="t('authentication-form.values.email')"
												autocomplete="email"
												:loading="formAsyncEmailLoading"
												:error="formToggleUIErrors ? formErrors.email || !formAsyncEmailValid : false"
												:error-messages="
												formToggleUIErrors ?
													formErrors.email ?
														t('authentication-form.errors.email-' + formErrors.email) :
														!formAsyncEmailValid ?
															t('authentication-form.errors.email-already-used') :
															'' :
														''
											"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="name" -->
											<v-text-field
												v-model="formValues.firstname"
												:label="t('authentication-form.values.firstname')"
												:error="formToggleUIErrors ? formErrors.firstname : false"
												:error-messages="formToggleUIErrors && formErrors.firstname ? t('authentication-form.errors.firstname-' + formErrors.firstname) : ''"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="???" -->
											<v-text-field
												v-model="formValues.lastname"
												:label="t('authentication-form.values.lastname')"
												:error="formToggleUIErrors ? formErrors.lastname : false"
												:error-messages="formToggleUIErrors && formErrors.lastname ? t('authentication-form.errors.lastname-' + formErrors.lastname) : ''"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-model="formValues.phone"
												:label="t('authentication-form.values.phone')"
												autocomplete="tel"
												:error="formToggleUIErrors ? formErrors.phone : false"
												:error-messages="formToggleUIErrors && formErrors.phone ? t('authentication-form.errors.phone-' + formErrors.phone) : ''"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<!-- autocomplete="???" -->
											<v-text-field
												v-model="formValues.birthday"
												type="date"
												:label="t('authentication-form.values.birthday')"
												:error="formToggleUIErrors ? formErrors.birthday : false"
												:error-messages="formToggleUIErrors && formErrors.birthday ? t('authentication-form.errors.birthday-' + formErrors.birthday) : ''"
											/>
										</v-col>
										<v-col cols="12">
											<v-checkbox
												v-model="formValues.terms"
												class="text-secondary"
												:error="formToggleUIErrors ? formErrors.terms : false"
												:error-messages="formToggleUIErrors && formErrors.terms ? t('authentication-form.errors.terms-' + formErrors.terms) : ''"
											>
												<template #label>
													<span v-html="t('authentication-form.info.terms')"></span>
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
										{{ t('authentication-form.submit-signup') }}
									</v-btn>
								</v-form>
								<!-- Authentication -->
								<v-form v-else>
									<h1 class="text-h2 text-center">
										{{ t('authentication-page.signup') }}
									</h1>
									<p class="text-right mb-10">
										{{ t('authentication-page.signup-request') }}
										<router-link
											class="text-decoration-none"
											:to="{
											name: 'Registration'
										}"
										>
											<b class="text-secondary">
												{{ t('authentication-form.switch-to-signup') }}
											</b>
										</router-link>
									</p>

									<v-row>
										<v-col cols="12">
											<v-text-field
												v-model="formValues.authentication"
												:label="t('authentication-form.values.authentication')"
												:placeholder="t('authentication-form.info.authentication-typing')"

												:error="formToggleUIErrors ? formErrors.authentication : false"
												:error-messages="formToggleUIErrors && formErrors.authentication ? t('authentication-form.errors.authentication-' + formErrors.authentication) : ''"
											/>
										</v-col>

										<v-col cols="12">
											<v-text-field
												v-model="formValues.password"
												:label="t('authentication-form.values.password')"
												:type="formToggleShowPassword ? 'text' : 'password'"
												:error="formToggleUIErrors ? formErrors.password : false"
												:error-messages="formToggleUIErrors && formErrors.password ? t('authentication-form.errors.password-' + formErrors.password) : ''"
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
									</v-row>

									<div class="d-flex justify-end align-end flex-column mt-5" style="gap: 1em">
										<v-btn
											class="w-100"
											color="secondary"
											@click="formSubmit"
										>
											{{ t('authentication-form.submit-signin') }}
										</v-btn>
										<v-btn
											size="x-small"
											variant="plain"
											:to="{
											name: 'PasswordRetrieve'
										}"
										>
											{{ t('authentication-form.forgot-password') }}
										</v-btn>
									</div>
								</v-form>
								<!--
								<div v-show="formToggleUIErrors && formErrorsList.length > 0"
									class="form-errors"
								>
									<v-alert
										v-for="(error, index) in formErrorsList"
										:key="'error-' + index"
										type="error"
										class="my-2"
									>
										{{ t('authentication-form.errors.' + error) }}
									</v-alert>
								</div>
								-->
							</v-container>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-defaults-provider>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch } from "vue";
import { useStore } from "@/store";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import { formRules } from "@/resources/composables/useFormStructure";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import BusinessContactsPanel from "@/components/generic/panels/BusinessContactsPanel.vue";
import { imagesUrl } from "@/resources/constants";
import type { loginFormMap, userInfoFormMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import useFormDataUser from "@/resources/composables/useFormDataUser";

library.add(faEye, faEyeSlash, faCircleCheck, faTriangleExclamation);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { commit, dispatch } = useStore();

const props = defineProps({
	/**
	 * If we are on signin or signup page or forgot password (3 routes: same component)
	 * Easy switch between modes
	 */
	mode: {
		type: String,
		required: false
	},
});

/**
 * Offline schema to validate reactively on user inputs
 * YUP schema used with vee-validate
 */
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
// type formUserInfoSchemaType = yup.InferType<typeof formUserInfoSchema>;
// authentication
const formAuthenticationSchema = yup.object({
	authentication: formRules.required,
	password: formRules.required,
});
// type formAuthenticationSchemaType = yup.InferType<typeof formAuthenticationSchema>;
const formPasswordRetrieveSchema = yup.object({
	email: formRules.email
});
// type formPasswordRetrieveSchemaType = yup.InferType<typeof formPasswordRetrieveSchema>;

/**
 * All form values are stored here
 */
const formValues = ref<loginFormMap | userInfoFormMap>({});
const enableAsyncValidation = computed(() => props.mode === 'registration');

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
} = useFormDataUser<loginFormMap | userInfoFormMap>(
	formValues,
	computed(() =>
		props.mode === 'registration' ? formUserInfoSchema :
			props.mode === 'login' ? formAuthenticationSchema :
				props.mode === 'password-retrieve' ? formPasswordRetrieveSchema : yup.object()
	),
	enableAsyncValidation,
	enableAsyncValidation
);

/**
 * Reset form
 * Need to reset the validation too.
 */
const formReset = () => {
	// TODO reset with initial values? Put in useFormStructure? (error: can't change constant)
	formValues.value = {};
	formToggleUIErrors.value = false;
	formValidate();
};

/**
 * When Mode change, need to reset then validate (to reset the validation)
 */
watch(() => props.mode, () => formReset())

/**
 * Extended formIsValid
 *  - check that username and email are VALID and UNIQUE only if user is registering
 */
const formIsValid = computed(() =>
	formIsValidOriginal.value && (
		(
			props.mode === 'registration' &&
			formAsyncUsernameValid.value &&
			formAsyncEmailValid.value
		) ||
		props.mode !== 'registration'
	)
);

/**
 * Submit form, do page action
 *  - register
 *  - authenticate
 *  - send password reset code via email
 */
const formSubmit = () => {
	// set errors to visible
	formToggleUIErrors.value = true;
	// errors check
	if(!formIsValid.value)
		return;
	// submit
	(
		props.mode === 'registration' ?
			dispatch('user/userRegistration', formValues.value) :
			props.mode === 'login' ?
				dispatch('user/userLogin', {
					authentication: (formValues.value as loginFormMap).authentication,
					password: (formValues.value as loginFormMap).password
				}) :
				props.mode === 'password-retrieve' ?
					// TODO password-retrieve
					dispatch('user/userRetrievePassword') :
					Promise.resolve()
	).catch((errors = []) => {
		for(let i = errors.length; i--; )
			commit("addToast", {
				color: 'error',
				title: 'Error',
				text: errors[i],
				timeout: 5000
			});
	})
}

/**
 * Form UI rules
 */
const authenticationFormUIRules = {
	VTextField: {
		// variant: 'outlined',
		hideDetails: 'auto'
	},
	VCheckbox: {
		hideDetails: 'auto'
	}
};
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#authentication-page{
	.authentication-section{
		position: relative;
		height: 100%;
		min-height: 100vh;

		.form-container{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			max-height: 100%;

			overflow-y: auto;
			@include guebbit-builder-scrollbar(4px, rgb(var(--v-theme-primary)));
		}

		.v-container{
			flex-grow: 1;
			margin: 0 auto;
			max-width: 600px;
			padding: 24px;
		}

		.v-input__append{
			align-items: center;
			padding-top: 0;
		}
	}

	@include media-mobile(){
		& > .v-row{
			& > *{
				&:first-child{
					order: 2;
				}
				&:last-child{
					order: 1;
				}
			}
		}
	}
}
</style>