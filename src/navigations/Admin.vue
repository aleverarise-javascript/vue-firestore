<template>
	<div>
		<v-toolbar app dark color="primary">
			<v-toolbar-side-icon @click="toggleDrawer" />
			<v-toolbar-title>
				<v-btn color="dark" to="/">Vuejs 2 Firestore</v-btn>
			</v-toolbar-title>

			<v-spacer />
			
			<v-toolbar-items class="hidden-sm-and-down">

				<v-btn flat to="/admin">{{ $t('navigation.admin') }}</v-btn>
				<v-btn flat to="/shop">{{ $t('navigation.shop') }}</v-btn>
				<v-btn flat @click="logout">{{ $t('navigation.logout') }}</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<v-navigation-drawer overlay v-model="drawer" absolute value="">
			<v-list class="pt-0" dense>
				<v-list-tile v-for="(item, key) in items" :key="key" @click="$router.push(item.to)">
					<v-list-tile-action>
					  	<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-divider></v-divider>

				<v-list-tile @click="toggleDrawer">
					<v-list-tile-action>
					  	<v-icon>arrow_back</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ $t('navigation.close_menu') }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import navigationMixins from "@/mixins/navigations";
export default {
	name: "Admin",
	mixins: [navigationMixins],
	data() {
		return {
			drawer: false,
			items: [
				{ title: this.$t("navigation.admin"), icon: "store", to: "/admin" },
				{
					title: this.$t("navigation.home"),
					icon: "home",
					to: "/"
				},
				{
					title: this.$t("navigation.shop"),
					icon: "shopping_cart",
					to: "/shop"
				}
			]
		};
	}
};
</script>

<style lang="css" scoped>
</style>
