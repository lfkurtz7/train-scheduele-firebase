
$("#add-train-button").on("click", function (event) {
    event.preventDefault();


    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var addNewTrain = {
        name: name,
        destination: destination,
        firstTrain: moment(firstTrain, "HH:mm").format("X"),
        frequency: frequency
    };

   database.ref("/trains").push(addNewTrain);

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency)

    alert("Train Added");

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");


});


database.ref("/trains").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var tFrequency = childSnapshot.val().frequency;


    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(tFrequency)


    var firstTrainConverted = moment(firstTrain, "X");
    console.log(firstTrainConverted.format("MM/DD/YYYY HH:mm"));

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("MM/DD h:mm a");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#new-train-table > tbody").append(newRow);


})