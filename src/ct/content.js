var buyOrders = {}
var sellOrders = {}
var $elem;


function updateView() {
	var diff = buyOrders.total_buy_volume - sellOrders.total_sell_volume;
	

	var target_element = $(".ticker-container");
	var $metrics = "<div id=\"koinexwatch\" class=\"card margin-bottom-10 white-background\"> \
					     <h4>BUY &nbsp;:: Average price: <span style=\"font-weight: bold;\">" + buyOrders.average_buy_price + "</span> | Total volume: <span style=\"font-weight: bold;\">" + buyOrders.total_buy_volume + "</span> | Total price: <span style=\"font-weight: bold;\">" + buyOrders.total_buy_price + "</span></h4>\
					     <h4>SELL :: Average sell: &nbsp;<span style=\"font-weight: bold;\">" + sellOrders.average_sell_price + "</span> | Total volume: <span style=\"font-weight: bold;\">" + sellOrders.total_sell_volume + "</span> | Total price: <span style=\"font-weight: bold;\">" + sellOrders.total_sell_price + "</span></h4>";


	
	if (diff < 0) {
		$metrics += "<h3>Diff: <span style=\"color: red; font-weight: bold\">" + diff.toFixed(2) + "</span>";
		// console.error(diff, buyOrders.average_buy_price, sellOrders.average_sell_price);
	}
	else {
		$metrics += "<h3>Diff: <span style=\"color: green; font-weight: bold\">" + diff.toFixed(2) + "</span>";
		// console.warn(diff, buyOrders.average_buy_price, sellOrders.average_sell_price);
	}

	$metrics += "</div>";
	$("#koinexwatch").remove();
	target_element.after($metrics);
}

function getOrders() {
	var sell_orders = $(".buy-orders").clone();
	var sell_orders = Array.from(sell_orders.children());

	var total_sell_price = sell_orders.map(function(a) {
		var row = a.children;
		return parseFloat(row[0].innerHTML.replace(",", ""))*parseFloat(row[1].innerHTML.replace(",", ""));
	})
	.reduce(function(a, b) {
		return a + b;
	});

	var total_sell_volume = sell_orders.map(function(a) {
		return parseFloat(a.children[0].innerHTML.replace(",", ""));
	})
	.reduce(function(a, b) {
		return a + b;
	});


	var average_sell_price = total_sell_price/total_sell_volume;

	sellOrders.total_sell_volume = total_sell_volume.toFixed(2);
	sellOrders.average_sell_price = average_sell_price.toFixed(2);
	sellOrders.total_sell_price = total_sell_price.toFixed(2);


	var buy_orders = $(".sell-orders").clone();
	var buy_orders = Array.from(buy_orders.children());

	var total_buy_price = buy_orders.map(function(a) {
		var row = a.children;
		return parseFloat(row[0].innerHTML.replace(",", ""))*parseFloat(row[1].innerHTML.replace(",", ""));
	})
	.reduce(function(a, b) {
		return a + b;
	});

	var total_buy_volume = buy_orders.map(function(a) {
		return parseFloat(a.children[0].innerHTML.replace(",", ""));
	})
	.reduce(function(a, b) {
		return a + b;
	});


	var average_buy_price = total_buy_price/total_buy_volume;

	buyOrders.total_buy_volume = total_buy_volume.toFixed(2);
	buyOrders.average_buy_price = average_buy_price.toFixed(2);
	buyOrders.total_buy_price = total_buy_price.toFixed(2);

	updateView();
}

setInterval(getOrders, 500);