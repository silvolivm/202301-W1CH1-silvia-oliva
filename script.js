const buttonNumber = document.querySelectorAll('[data-number]')
const buttonOperator = document.querySelectorAll('[data-operator]')
const buttonTotal = document.querySelector('[data-igual]')
const buttonDeleteAll = document.querySelector('[data-delete-todo]')
const buttonDelete = document.querySelector('[data-delete]')
const textValueUpper = document.querySelector('[data-value-upper]')
const textValueLower = document.querySelector('[data-value-lower]')


class Calculator {
    constructor(textValueLower,textValueUpper){
        this.textValueLower = textValueLower
        this.textValueUpper = textValueUpper
        this.valueLower = ''
        this.valueUpper = ''
        this.operator = undefined
    }

    addNumber(number){
    if(number === '.' && this.valueLower.includes('.')) return
    this.valueLower = this.valueLower + number
    }
    printDisplay() {
        this.textValueLower.innerText = this.valueLower
        this.textValueUpper.innerText = this.valueUpper
    }
    delete (){
        this.valueLower = this.valueLower.slice(0,-1)
    }
    choiseOperator(operator) {
        if(this.valueLower == '') return
        if(this.valueUpper != '') {
            this.makeResult()
        }
        this.operator = operator
        this.valueUpper = this.valueLower
        this.valueLower = ''
    }
    makeResult() {
        let result
        let upperValueConversion = parseFloat(this.valueUpper)
        let lowerValueConversion = parseFloat (this.valueLower)
        if(isNaN(upperValueConversion) || isNaN(lowerValueConversion)) return
        switch (this.operator) {
            case '+':
            result = upperValueConversion + lowerValueConversion
            break
            case '-':
            result = upperValueConversion - lowerValueConversion
            break
            case '*':
            result = upperValueConversion * lowerValueConversion
            break
            case '÷':
            result = upperValueConversion / lowerValueConversion
            break
            default: return
        }
        
        this.valueLower = result
        this.operator = undefined
        this.valueUpper= ''
    }

    cleanScreen() {
        this.valueLower = ''
        this.valueUpper = ''
        this.operator = undefined

    }
}



const calculator = new Calculator (textValueLower,textValueUpper)



buttonNumber.forEach(button => {
    button.addEventListener('click', () => {
       calculator.addNumber(button.innerText)
       calculator.printDisplay() 
    })
})


buttonDelete.addEventListener('click', () => {
    calculator.delete()
    calculator.printDisplay()
})

buttonOperator.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choiseOperator(button.innerText)
        calculator.printDisplay() 
    })
})
buttonTotal.addEventListener('click', () => {
    calculator.makeResult()
    calculator.printDisplay()
})

buttonDeleteAll.addEventListener('click',() => {
    calculator.cleanScreen()
    calculator.printDisplay()
})