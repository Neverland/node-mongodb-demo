/**
 * Created by enix@foxmail.com on 14-1-18.
 */


(function (window, doc, undefined) {

	doc.addEventListener('DOMContentLoaded', function () {

		//var socket = io.connect('ws://localhost:3000');

		/*socket.on('message', function (data){
			 console.log(data);
			//doc.body.insertAdjacentHTML('beforeEnd','<p>' + data.index + '</p>')

		});*/
		var socket = new WebSocket('ws://localhost:3000')
		socket.addEventListener('open', function () {
			console.log('ok');
			ping();
		},false)
		socket.addEventListener('message', function (msg) {
			console.log(msg);
			ping();
		})

		function ping() {
			console.log(socket)
			socket.send('ping:'+ new Date);
		}
	}, false)

})(this, document)