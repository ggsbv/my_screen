var currentUserInput = document.querySelectorAll('.currentUserInput');
var userInputBox = document.querySelector('#userInputBox');
var radioButtons = document.querySelectorAll('.radioButton');

const breakfastData = {
  salt : {nh : 'Crackers', mh : 'Tuna & Egg Salad', vh : 'English Breakfast'},
  sweet : {nh : 'Smoothie', mh : 'Yoghurt & Muesli', vh : 'Maple Bacon Flapjacks'}
};

const lunchData = {
  salt : {nh : 'Thai Chicken Salad', mh : 'Grilled Chicken Wrap', vh : 'Chateaubriand'},
  sweet : {nh : 'Maple Bacon Flapjacks', mh : 'Sweet Chilli Steak Wrap', vh : 'Honey BBQ Burger'}
};

console.log(radioButtons);
//function getRadioValue accepts a list of radio buttons and returns the value
//of the checked button, or returns false if no radio button was checked.
function getRadioValue(radioButtonList){
  for (var i = 0; i < radioButtonList.length; i++){
    var currentButton = radioButtonList[i];
    console.log(currentButton);
    if(currentButton.checked){
      return currentButton.value;
    }
  }
  return false;
}

function getInput(eventTarget, currentStep){
  var input = "";
  if(eventTarget.type === 'button'){
    if(currentStep < currentUserInput.length){
      if(eventTarget.id === 'nextButton'){
        input = Number(getRadioValue(radioButtons));
        console.log(input);
        if(input === 1 || input === 2){
          input = 'nh';
        } else if(input === 3){
          input = 'mh';
        } else {
          input = 'vh';
        };
      } else{
        input = eventTarget.textContent;
      };
    };
  };
  return input;
};

function whichMeal(userChoiceList){
  var mealtime = userChoiceList[0].toLowerCase('');

  if(mealtime === 'breakfast'){
    return breakfastData;
  } else{
    return lunchData;
  }
};

function analyseChoices(listOfData, userChoiceList){
  var preference = userChoiceList[2].toLowerCase('');
  console.log(preference);
  var hungerRating = userChoiceList[1].toLowerCase('');
  var selectedPreferenceObj = listOfData[preference];
  return selectedPreferenceObj[hungerRating];
};

function resultImage(result){
  switch (result) {
    case 'Crackers':
      return 'crackers.jpg';
      break;
    case 'Tuna & Egg Salad':
      return 'tuna_and_egg_salad.jpg';
      break;
    case 'English Breakfast':
      return 'english_breakfast.jpg';
      break;
    case 'Smoothie':
      return 'smoothie.jpg';
      break;
    case 'Yoghurt & Muesli':
      return 'yoghurt_and_muesli.jpg';
      break;
    case 'Maple Bacon Flapjacks':
      return 'maple_bacon_flapjacks.jpg';
      break;
    case 'Thai Chicken Salad':
      return 'thai_chicken_salad.jpg';
      break;
    case 'Grilled Chicken Wrap':
      return 'grilled_chicken_wrap.png';
      break;
    case 'Chateaubriand':
      return 'chateaubriand.jpg'
      break;
    case 'Honey Mustard Salad':
      return 'honey_mustard_salad.jpg'
      break;
    case 'Sweet Chilli Steak Wrap':
      return 'sweet_chilli_steak_wrap.jpg';
      break;
    case 'Honey BBQ Burger':
      return 'honey_bbq_burger.jpg'
      break;
  }
}

var currentStep = 0;

currentUserInput[currentStep].classList.toggle('hidden');

var choices = [];

userInputBox.addEventListener('click', function(event){
  var input = "";
  if(event.target.type === 'button'){
    if(0 < currentStep && currentStep < currentUserInput.length) {
      input = getInput(event.target, currentStep);
      choices.push(input);
    }
    console.log(input);
    if (currentStep < currentUserInput.length - 1){
      currentUserInput[currentStep].classList.toggle('hidden');
      currentStep++;
      currentUserInput[currentStep].classList.toggle('hidden');
    }
    if(currentStep === currentUserInput.length - 1){
      var mealData = whichMeal(choices);
      var result = analyseChoices(mealData, choices);
      var resultImg = resultImage(result);
      var source = document.querySelector('#userOutputTemplate').innerHTML;
      template = Handlebars.compile(source);
      var data = {results:
        {resultText : result + "!", resultImage : resultImg}
      };
      var resultDiv = document.querySelector('#resultDiv');
      resultDiv.innerHTML = template(data);
      resultDiv.scrollIntoView();
    };
  }
});
