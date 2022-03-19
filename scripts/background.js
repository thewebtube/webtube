window.addEventListener(
	"visibilitychange",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

window.addEventListener(
	"webkitvisibilitychange",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

window.addEventListener(
	"blur",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);