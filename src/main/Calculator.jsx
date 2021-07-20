import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

//Criando estado inicial, para a função clear usar
const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {
  state = { ...initialState }
  constructor(props) {
    super(props)
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  addDigit = n => {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }

    // Setando meu novo displayValue
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    // Setando meu novo values[]
    if (n != '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
      console.log(values)
    }
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation == '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      // refatorar eval
      values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }




  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" triple action={this.clearMemory} />
        <Button label="/" operation action={this.setOperation} />
        <Button label="7" action={this.addDigit} />
        <Button label="8" action={this.addDigit} />
        <Button label="9" action={this.addDigit} />
        <Button label="*" operation action={this.setOperation} />
        <Button label="4" action={this.addDigit} />
        <Button label="5" action={this.addDigit} />
        <Button label="6" action={this.addDigit} />
        <Button label="-" operation action={this.setOperation} />
        <Button label="1" action={this.addDigit} />
        <Button label="2" action={this.addDigit} />
        <Button label="3" action={this.addDigit} />
        <Button label="+" operation action={this.setOperation} />
        <Button label="0" double action={this.addDigit} />
        <Button label="." action={this.addDigit} />
        <Button label="=" operation action={this.setOperation} />
      </div>
    )
  }
}
