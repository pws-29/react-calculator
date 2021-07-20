import React from 'react'
import './Button.css'

export default props => {
  let classes = 'button '
  classes += props.operation ? 'operation' : ''
  classes += props.double ? 'double' : ''
  classes += props.triple ? 'triple' : ''

  function acaoBotao(evento) {
    props.action(props.label)
  }

  return (
    <button
      onClick={acaoBotao}
      className={classes}
    >
      {props.label}
    </button>
  )
}
