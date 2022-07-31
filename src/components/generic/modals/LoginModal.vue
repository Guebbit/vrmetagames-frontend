<template>
    <!-- @click:outside="toggleModal(false)" -->
    <v-dialog
        :model-value="dialogValue"
        persistent
        class="theme-modal"
    >
		<v-card>
			<v-img
				width="400"
				:src="imagesUrl + 'logo/logotype.svg'"
				cover
			>
				<v-tabs
					v-model="modeSelected"
					background-color="transparent"
					grow
				>
					<v-tab value="login">
						LOGIN
					</v-tab>
					<v-tab value="register">
						REGISTER
					</v-tab>
				</v-tabs>
				<div class="h-100 d-flex justify-center flex-column">
					<v-window v-model="modeSelected">
						<v-window-item value="login">
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field
											label="Username*"
											required
											:rules="[formRules.required]"
											hide-details="auto"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											label="Password*"
											type="password"
											required
											:rules="[formRules.required]"
											hide-details="auto"
										></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-window-item>
						<v-window-item value="register">
							<h1>GG OP</h1>
						</v-window-item>
					</v-window>
				</div>
			</v-img>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue-darken-1"
					text
					@click="toggleModal(false)"
				>
					Close
				</v-btn>
				<v-btn
					color="blue-darken-1"
					text
					@click="toggleModal(false)"
				>
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import useModalShowStructure from "@/resources/composables/useModalShowStructure";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { ref } from "vue";
import { loginFormMap } from "@/interfaces";
import { formRules, imagesUrl } from "@/resources/constants";

const { dialogValue, toggleModal } = useModalShowStructure('login');

const { t } = useI18n();
const { dispatch } = useStore();

const form = ref<loginFormMap>({
    user: '',
    password: ''
});

const submitLogin = () => {
    dispatch('user/userLogin', form)
}

const modeSelected = ref('login');
</script>

<style lang="scss">
.theme-modal{
    .v-card{
        .v-card-header{
            padding-top: 48px !important;
            padding-bottom: 24px !important;
            justify-content: center;
        }
        .v-card-title{
            font-size: 3em;
        }
    }
}
</style>