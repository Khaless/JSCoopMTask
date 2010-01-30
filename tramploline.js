
/*
 * Cooperative Multitasking using
 * Trampolining & Generators
 */

function trampoline() {
	var receivers = {
		'producer': producer(),
		'consumer': consumer()
  }
	var fn = receivers['producer'];
	while(true) {
		var ret = fn.next();
		if (ret == 'stop') return; 
		fn = receivers[ret];
  }
}

var VALUE = 0;

function producer() {
	print("Entering Producer")
	var i = 1;
	while(true) {
		print("producing (" + i++ + ")...");
		VALUE = Math.ceil(Math.random() * 50)
		yield 'consumer'; 
  }
}

function consumer() {
	print("Entering Consumer")
	var i = 1;
	while(true) {
		print("consuming (" + i++ + ")...");
		if(VALUE == 25) {
			print("consumer got value == 25");
			yield 'stop';
		}
		yield 'producer';
  }
}

trampoline();
