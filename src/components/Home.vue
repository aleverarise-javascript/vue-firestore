<template>
	<v-jumbotron color="grey lighten-2">
		<v-container fill-height>
			<v-layout align-center>
				<v-flex>
					<h3 class="display-3">
						{{ $t('welcome.title', {app: 'Vuejs 2 + FireStore'}) }}
					</h3>
					<span class="subheading">
						{{ $t('welcome.content') }}
					</span>

					<v-divider class="my-3"></v-divider>

					<div class="title b-t">
						{{  $t('welcome.call_to_action') }}
					</div>

					<v-btn color="primary" large class="mx-0" to="/login">
						{{ $t('welcome.action_button') }}
					</v-btn>

				</v-flex>
			</v-layout>
		</v-container>
	</v-jumbotron>
</template>

<script>
export default {

  	name: 'Home',

  	data () {
	    return {

	    }
  	}
}
</script>

<style lang="css" scoped>
</style>