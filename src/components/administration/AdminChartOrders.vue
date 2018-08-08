<template>
	<v-container fluid grid-list-md>
		<line-chart :chart-data="collectionData" :options="options" />
	</v-container>
</template>

<script>
import LineChart from './charts/LineChart'
import {db} from '@/main'
import * as _ from 'lodash'
import moment from 'moment'

export default {

  	name: 'AdminChartOrders',
  	components: {
  		LineChart,
  	},
  	data () {
	    return {
	    	collectionData: null,
	    	orders: [],
	    	options: {
	    		scales: {
	    			yAxes: [
	    				{
	    					ticks: {
	    						stepSize: 1,
	    						suggestedMin: 0
	    					}
	    				}
	    			],
	    			xAxes: [
	    				{
	    					ticks: {
	    						callback: value => {
	    							return moment.unix(value).format('DD/MM/YYYY')
	    						}
	    					}
	    				}
	    			]
	    		},
	    		tooltips: {
	    			callbacks: {
	    				label: (tooltipItem, data) => {
	    					const money = data.datasets[tooltipItem.datasetIndex].money[tooltipItem.index] || ''
	    					const label = tooltipItem.yLabel
	    					return [
	    						`Pedidos: ${label}`, `Ganancias: ${money}$`
	    					]
	    				}
	    			}
	    		}
	    	}
	    }
  	},
  	mounted(){
  		this.fillData()
  	},
  	methods: {
  		fillData(){
  			db.collection('orders').onSnapshot(snapshot => {
  				this.orders = []
  				snapshot.forEach(order => {
  					let orderData = order.data()
  					let date = moment(orderData.createdAt, 'DD/MM/YYYY').unix()
  					let existDay = _.find(this.orders, {label: date})
  					if (!existDay) {
  						this.orders.push({
  							label: date,
  							value: 1,
  							money: parseFloat(orderData.totalCost)
  						})
  					}else{
  						existDay.value += 1
  						existDay.money += parseFloat(orderData.totalCost)
  					}
  				})

  				this.collectionData = {
  					labels: Object.values(_.mapValues(_.sortBy(this.orders, 'label'), 'label')),
  					datasets: [
  						{
  							label: 'pedidos de la tienda',
  							backgroundColor: '#f87979',
  							data: Object.values(_.mapValues(_.sortBy(this.orders, 'label'), 'value')),
  							money: Object.values(_.mapValues(_.sortBy(this.orders, 'label'), 'money')),
  						}
  					]
  				}
  			})
  		}
  	}
}
</script>

<style lang="css" scoped>
</style>
