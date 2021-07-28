$(document).ready( () => {
    let availableTwoThousand = 100;
    let availableFiveHundred = 100;
    let availableTwoHundred = 100;
    let availableOneHundred = 100;

    $("#thousandLeft").text(availableTwoThousand);
    $("#fiveLeft").text(availableFiveHundred);
    $("#twoLeft").text(availableTwoHundred);
    $("#oneLeft").text(availableOneHundred);
    let error = "";
    let val = "";

    $("#rupees").keyup( () => {
        val = $("#rupees").val();
        //check denominations
        console.log(val%100);

        if (val % 100 !== 0){
            $("#error").fadeIn(1000);
            $("#error").removeClass("no_error");
            $("#error").addClass("error");
            error = "Please enter amount in the multiple of 100";
            $("#error").text(error);
        } 
        if (val.length < 1){
            $("#error").addClass("error");
            $("#error").text("");
            error = "blank field";
        } else if(val % 100 == 0) { // success
            $("#error").removeClass("error");
            $("#error").addClass("no_error");
            $("#error").text("Valid Denomintaion");
            error = "";
        }
        //check denominations
    });

    $("#withdraw").click( () => {
        if (val.length < 1){
            $("#error").addClass("error");
            $("#error").text("");
            error = "Please enter amount to be withdrawn";
        }

        if (error.length > 0){ // if valid
            $("#error").removeClass("no_error");
            $("#error").fadeIn();
            $("#error").addClass("error");
            $("#error").text(error);
        } else { // money dispensing starts here
            let leftAmount = 9;
            let decrementNoOfNotesFromTotal = 0;
            let msg = "";

            if (availableTwoThousand < 1 && availableFiveHundred < 1 && availableTwoHundred < 1 && availableOneHundred < 1){
                $("#error").removeClass("no_error");
                $("#error").fadeIn();
                $("#error").addClass("error");
                $("#error").text("Sorry no cash");
                return false;
            }

            leftAmount = val;

            if (availableTwoThousand > 0){  // 2000
                // if (leftAmount % 2000 == 0){
                    leftAmount = parseInt(val % 2000);  // 3000 % 2000 == 1000, Remainder
                    decrementNoOfNotesFromTotal = parseInt(val / 2000);  //2000 / 2000 == 1, Quotient
                    availableTwoThousand = parseInt(availableTwoThousand - decrementNoOfNotesFromTotal);
                // }
                if (decrementNoOfNotesFromTotal > 0){
                    let img2000URL= "./images/2000.png";
                    msg = parseInt(decrementNoOfNotesFromTotal) + ` note(s) of&nbsp;&nbsp;<img src='${img2000URL}' height='80' width='170' style='position:absolute;margin-top:-30px;'><br /><br /><br /><br /><br />`;
                }
            }

            if (leftAmount == 0){ // 2000
                // dispens cash
                $("#successfulTransaction").html("Please collect:- <br /><br /><br /> " + msg);
            } else {
                if (availableFiveHundred > 0){  //  500
                    // if (leftAmount % 500 == 0){
                        decrementNoOfNotesFromTotal = parseInt(leftAmount / 500);
                        leftAmount = parseInt(leftAmount % 500);
                        availableFiveHundred = parseInt(availableFiveHundred - decrementNoOfNotesFromTotal);
                    // }
                    if (decrementNoOfNotesFromTotal > 0){
                        let img500URL = "./images/500.png";
                        msg = msg + parseInt(decrementNoOfNotesFromTotal) + ` note(s) of&nbsp;&nbsp;<img src='${img500URL}' height='80' width='170' style='position:absolute;margin-top:-30px;'><br /><br /><br /><br /><br />`;
                    }
                }

                if (leftAmount == 0){
                    //dispense cash
                    // msg = msg + decrementNoOfNotesFromTotal + " note(s) of 500";
                    $("#successfulTransaction").html("Please collect:- <br /><br /><br /> " + msg);
                } else {
                    if (availableTwoHundred > 0){  //   200
                        // if (leftAmount % 200 == 0){
                            decrementNoOfNotesFromTotal = parseInt(leftAmount / 200);
                            leftAmount = parseInt(leftAmount % 200);
                            availableTwoHundred = parseInt(availableTwoHundred - decrementNoOfNotesFromTotal);
                        // }
                        if (decrementNoOfNotesFromTotal > 0){
                            let img200URL = "./images/200.jpg";
                            msg = msg + parseInt(decrementNoOfNotesFromTotal) + ` note(s) of&nbsp;&nbsp;<img src='${img200URL}' height='80' width='170' style='position:absolute;margin-top:-30px;'><br /><br /><br /><br /><br />`;
                        }
                    }

                    if (leftAmount == 0) {
                        //dispense cash
                        // msg = msg + decrementNoOfNotesFromTotal + " note(s) of 200";
                        $("#successfulTransaction").html("Please collect:- <br /><br /><br /> " + msg);
                    } else {
                        if (availableOneHundred > 0){  //   100
                            // if (leftAmount % 100 == 0){
                                decrementNoOfNotesFromTotal = parseInt(leftAmount / 100);
                                leftAmount = parseInt(leftAmount % 100);
                                if (decrementNoOfNotesFromTotal > availableOneHundred){
                                    msg = "Sorry required amount not available";
                                    $("#successfulTransaction").html(msg);
                                    return false;
                                } else {
                                    availableOneHundred = parseInt(availableOneHundred - decrementNoOfNotesFromTotal);
                                }
                            // }
                        }

                        if (leftAmount == 0){
                            //dispense cash
                            let img100URL = "./images/100.png";
                            msg = msg + decrementNoOfNotesFromTotal + ` note(s) of&nbsp;&nbsp;<img src='${img100URL}' height='80' width='170' style='position:absolute;margin-top:-30px;'><br /><br /><br /><br /><br />`;
                            $("#successfulTransaction").html("Please collect:- <br /><br /><br /> " + msg);
                        }
                    }
                }
            }
        }

        $("#thousandLeft").text(availableTwoThousand);
        $("#fiveLeft").text(availableFiveHundred);
        $("#twoLeft").text(availableTwoHundred);
        $("#oneLeft").text(availableOneHundred);
        return false;
    });

    $("#reset").click( (e) => {
        e.preventDefault();
        availableTwoThousand = 100;
        availableFiveHundred = 100;
        availableTwoHundred = 100;
        availableOneHundred = 100;
        $("#thousandLeft").text(availableTwoThousand);
        $("#fiveLeft").text(availableFiveHundred);
        $("#twoLeft").text(availableTwoHundred);
        $("#oneLeft").text(availableOneHundred);
        error = "";
        $("#error").text('');
        $("#successfulTransaction").html('');
        $("#rupees").val("");
    });

});