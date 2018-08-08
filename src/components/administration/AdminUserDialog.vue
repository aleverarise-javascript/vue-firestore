<template>
	<v-dialog
	  	v-model="usersDialog"
	  	persistent :overlay="false"
	  	width="500"
	  	transition="dialog-transition"
	>
		<v-btn dark slot="activator" class="indigo lighten-1 white--text text-xs-center mb-2">
			{{$t('admin.usersTable.newUser')}}
		</v-btn>

		<v-card>
			<v-card-title primary-title>
				<span class="headline">
					{{$t('admin.usersTable.newUser')}}
				</span>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex xs12>
						  	<v-text-field
						  	  	v-model="userForEdit.email"
						  	  	:label="$t('auth.email')"
						  	></v-text-field>
						</v-flex>

						<v-spacer></v-spacer>

						<v-flex xs12>
						  	<v-text-field
						  	  	v-model="userForEdit.username"
						  	  	:label="$t('auth.username')"
						  	></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-card-actions>
			  	<v-spacer></v-spacer>

			  	<v-btn color="blue darken-1" flat @click="close"> {{$t('common.close')}} </v-btn>
			  	<v-btn v-if="usersDialogEditMode" color="blue darken-1" flat @click="update">{{$t('common.update')}}</v-btn>
			  	<v-btn v-else color="blue darken-1" flat @click="add">{{$t('common.save')}}</v-btn>
			</v-card-actions>
		</v-card>
	  
	</v-dialog>
</template>

<script>
import { db } from "@/main";
import * as faker from "faker";
import { mapGetters } from "vuex";

export default {
	name: "AdminUserDialog",

	data() {
		return {};
	},
	methods: {
		close() {
			this.$store.commit("toggleUsersDialog", {
				editMode: false,
				user: {
					uid: null,
					email: "",
					username: ""
				}
			});
		},
		add() {
			this.userForEdit.uid = faker.random.alphaNumeric(16);
			this.userForEdit.role = "customer";
			const user = Object.assign({}, this.userForEdit);
			db.collection("users")
				.doc(this.userForEdit.uid)
				.set(user)
				.then(() => {
					this.$store.commit("setAlertMessage", {
						show: true,
						type: "success",
						message: this.$t("messages.saved", {
							item: this.$t("common.user")
						}),
						timeout: 5000
					});
				});
			this.close();
		},
		update() {
			const user = Object.assign({}, this.userForEdit);
			db.collection('users')
				.doc(user.uid)
				.update(user)
				.then(() => {
					this.$store.commit("setAlertMessage", {
						show: true,
						type: "success",
						message: this.$t("messages.updated", {
							item: this.$t("common.user")
						}),
						timeout: 5000
					});
				});
			this.close();
		}
	},
	computed: {
		usersDialog: {
			get() {
				return this.$store.getters.usersDialog;
			},
			set() {
				this.close();
			}
		},
		...mapGetters(["userForEdit", "usersDialogEditMode"])
	}
};
</script>

<style lang="css" scoped>
</style>
