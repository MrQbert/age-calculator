const dayInput = document.querySelector('#day'); 
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const submitBTN = document.querySelector('button')
const allInputsNode = document.querySelectorAll('input');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
console.log(currentDay)
let flag;



function getMaxDaysinMonth(){
    let maxDaysinMonth 
    switch(Number(monthInput.value)){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
        maxDaysinMonth = 31
        break
        case 2:
        maxDaysinMonth = 28;
        break
        default: 
        maxDaysinMonth = 30
    }
    return maxDaysinMonth
    
}




function submitInfo(e){
    e.preventDefault();
    const allInputs = Array.from(allInputsNode)
    let flag = false
    for(let input of allInputs){
        let numberInput = Number(input.value)
        if(input.value === null || input.value === ""){
            input.nextElementSibling.classList.remove('hide')
                       input.nextElementSibling.textContent = "This Field is Required"
            flag = true
        }else if(isNaN(numberInput)){
            input.nextElementSibling.textContent = "Please enter a valid Number"
            input.nextElementSibling.classList.remove('hide')
            flag = true

        }else{
            input.nextElementSibling.classList.add('hide')
        }

    }
    if(!flag){
        individualValidation()
    } 
}
const individualValidation = ()=>{
    let flag = false
    const dayInputNumber = Number(dayInput.value);
    const monthInputNumber = Number(monthInput.value)
    const yearInputNumber = Number(yearInput.value)
    const thisYear = Number(currentDate.getFullYear())
    const maxDaysinMonth = getMaxDaysinMonth();
    if(yearInputNumber > thisYear){
        yearInput.nextElementSibling.classList.remove('hide')
        yearInput.nextElementSibling.textContent = "Must Be in the Past"
        flag= true}
    else if(monthInputNumber > 12){
        monthInput.nextElementSibling.classList.remove('hide')
        monthInput.nextElementSibling.textContent = "Please enter a valid Month"
        console.log(monthInputNumber)
        flag = true
    }else if(dayInputNumber > maxDaysinMonth){
            dayInput.nextElementSibling.classList.remove('hide')
            dayInput.nextElementSibling.textContent = "Please enter a valid Date"
            flag = true;
        }
      else if(yearInputNumber == currentYear && monthInputNumber  > currentMonth ){
        monthInput.nextElementSibling.classList.remove('hide')
         monthInput.nextElementSibling.textContent = "Please enter a valid Month"
         flag = true;

      } else if(yearInputNumber === currentYear && monthInputNumber === currentMonth && dayInputNumber > currentDay  ){
        dayInput.nextElementSibling.classList.remove('hide')
         dayInput.nextElementSibling.textContent = "Please enter a valid Day"
         flag = true;

      }else if(!flag){
        calculateAge(dayInputNumber, monthInputNumber, yearInputNumber)
    }

    
}

function calculateAge(d,m,y){
    let yearOutput = document.querySelector(".yearOutput")
    let monthOutput = document.querySelector(".monthOutput")
    let dayOutput = document.querySelector(".dayOutput")
    const maxDaysinMonth = getMaxDaysinMonth();
    let yearsOld = currentYear -y;
    let monthsOld;
    let daysOld;


    if(m <= currentMonth){
        monthsOld = currentMonth - m;
    }else{
        yearsOld = yearsOld - 1;
        monthsOld = 12 - (Math.abs(m - currentMonth))
    }
    
    if(d <= currentDay){
        daysOld = currentDay - d
        console.log("less then")
    }else{
        monthsOld = monthsOld - 1 
        daysOld =  maxDaysinMonth - (Math.abs(currentDay - d));
        console.log("more then")
    }
    


    yearOutput.textContent = yearsOld 
    monthOutput.textContent = monthsOld
    dayOutput.textContent = daysOld

}


submitBTN.addEventListener("click", submitInfo)