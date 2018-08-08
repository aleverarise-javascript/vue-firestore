<template>
	<v-snackbar
	  	v-model="showSnack"
	  	:timeout="timeout"
	 	:color="color"
	>
	  	{{ text }}
	  	<v-btn dark flat @click.native="showSnack = false">
	  		{{ $t('messages.close') }}
	  	</v-btn>
	</v-snackbar>
</template>

<script>
export default {

  	name: 'AppSnackBar',
  	props: ['snackBar', 'timeout', 'text'],
  	data () {
	    return {
	    	color: 'primary',
	    	mode: 'horizontal',
	    	showSnack: this.snackBar 
	    }
  	}
}
</script>

<style lang="css" scoped>
</style>