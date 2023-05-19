// const mqtt = require("mqtt");
//
// var options = {
//     protocol: "ws",
//     username: "alex",
//     password: "123456",
//     keepalive: 10,
//     // clientId uniquely identifies client
//     // choose any string you wish
//     clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
// };
// var client = mqtt.connect("ws://192.168.1.7:9001/mqtt", options);
//
// client.subscribe("/sensors/temp");
// console.log(options);
// console.log("Client subscribed ");
//
// var note;
// const getMessage = () => {
//     client.on("message", function (topic, message) {
//         note = message.toString();
//         // Updates React state with message
//         console.log(note);
//         //client.end();
//     });
// }
