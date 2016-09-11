
var config = {
	apiKey: "AIzaSyDirZWtzgMG6q4m24LV_ZMgzSkqRWcdJNo",
	authDomain: "train-schedule-bf4f9.firebaseapp.com",
	databaseURL: "https://train-schedule-bf4f9.firebaseio.com",
	storageBucket: "train-schedule-bf4f9.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
	var trainName = $("#trainName").val().trim();
	var destination = $('#destination').val().trim();
	var firstTrainTime = $('#firstTrainTime').val().trim();
	var frequency = $("#frequency").val().trim();

	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
	    frequency: frequency
	}

	database.ref().push(newTrain);

	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrainTime);
	console.log(newTrain.frequency);

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().firstTrainTime;
	var frequency = childSnapshot.val().frequency;
	var nextTime = 0;
	var timeToNext = 0;

	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(frequency);

	var firstTrainTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");
	console.log(firstTrainTimeConverted);
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	var remainder = diffTime % frequency;
	console.log(remainder);
	var timeToNext = frequency - remainder;
	console.log("MINUTES TILL TRAIN: " + timeToNext);
	var nextTrain = moment().add(timeToNext, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"))

	$(".table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + timeToNext + "</td></tr>");

}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
});



