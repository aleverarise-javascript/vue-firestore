<template>
	<v-layout row wrap>
		<v-flex xs12 sm3>
			<v-navigation-drawer permanent>
				<v-toolbar flat>
					<v-list>
						<v-list-tile-title class="title">
							{{$t('admin.home')}}
						</v-list-tile-title>	
					</v-list>
				</v-toolbar>

				<v-divider></v-divider>

				<v-list dense class="pt-0">
					<v-list-tile v-for="(item, key) in items" :key="key" :to="item.to">
						<v-list-tile-action>
							<v-icon>{{item.icon}}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{item.title}}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>

			</v-navigation-drawer>
		</v-flex>

		<v-flex xs12 sm8 style="margin-left: 15px">
			<router-view />
		</v-flex>

	</v-layout>
</template>

<script>
export default {
	name: "AdminHome",

	data() {
		return {
			items: [
				{
					title: this.$t('admin.users'), 
					icon: 'face', 
					to: '/admin/users'
				},
				{
					title: this.$t('admin.products'), 
					icon: 'shopping_cart', 
					to: '/admin/products'
				},
				{
					title: this.$t('admin.chart_orders'), 
					icon: 'bar_chart', 
					to: '/admin/chart_orders'
				},
			]
		};
	}
};
</script>

<style lang="css" scoped>
</style>
