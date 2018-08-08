const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.newOrder = functions.firestore
	.document("orders/{orderId}")
	.onCreate(event => {
		return admin
			.firestore()
			.collection("messages")
			.doc(event.data().id)
			.set({
				log: `Nuevo pedido realizado con ID ${event.data().id}, coste total: ${
					event.data().totalCost
				} €`
			});
	});
