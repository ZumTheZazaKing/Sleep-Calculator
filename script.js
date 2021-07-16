const selection = document.querySelector('.selection');
const results = document.querySelector('.results');
const timeInput = selection.querySelector('input[type=time]');
const calculateButton = selection.querySelector('.buttonCalc');
let selectedChoice = selection.querySelector('.selected');
const choices = selection.querySelectorAll('.button');
const resultsDesc = results.querySelector('p');
const tableData = results.querySelectorAll('.showTime');

//Operations to be done based on mode
let operations = {
    'wakeUp':function(timeToWake, sleepDuration){return timeToWake - sleepDuration},
    'sleepAt':function(timeToSleep, sleepDuration){return timeToSleep + sleepDuration}
}

//Function for outputing resultsDesc
function resultsDescSet(sleepType, timeInputValue, timePrefix){

    if(sleepType == 'wakeUp'){
        resultsDesc.innerHTML = `To wake up at ${timeInputValue} ${timePrefix}, you should sleep at:`;
    } else {
        resultsDesc.innerHTML = `To go to bed at ${timeInputValue} ${timePrefix}, you should wake up at:`;
    }

}


//Adding the function to calculateButton
calculateButton.addEventListener('click', () => {

    let type = selectedChoice.getAttribute('data-type');
    
    selection.classList.add('hide');
    results.classList.remove('hide');

    

    let initialSleepHour = 9;
    let initialSleepMinute = 0;
    let timeInputArray = timeInput.value.split(":");

    for(var i in tableData){

        let hourOutput = operations[type](parseInt(timeInputArray[0]), initialSleepHour);
        let minuteOutput = operations[type](parseInt(timeInputArray[1]), initialSleepMinute);

        let timePrefix;
        
        if(hourOutput < 0){
            hourOutput += 24;
        }
        if(!Number.isInteger(hourOutput)){
            let floatPart = hourOutput % 1;
            minuteOutput += (floatPart*10)/10 * 60;
        }
        if(minuteOutput > 60){
            minuteOutput -= 60;
            hourOutput += 1;
        }
        if(minuteOutput < 10){
            minuteOutput = "0" + minuteOutput;
        }
    
        if(hourOutput > 12){
            hourOutput -= 12;
            timePrefix = "PM";
        } else {
            timePrefix = "AM"
        }


        tableData[i].innerHTML = `${Math.floor(hourOutput)}:${minuteOutput} ${timePrefix}`;
        resultsDescSet(type, timeInput.value, timePrefix)

        initialSleepHour -= 1.5;

    }


})


//Adding function to the buttons
choices.forEach(choice => choice.addEventListener('click', () => {

    selectedChoice.classList.remove('selected');

    choice.classList.add('selected');

    selectedChoice = choice;

}))


