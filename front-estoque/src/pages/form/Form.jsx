import {React} from 'react'

function Form({selectedId, onClearId}) {

  return (
    <>
      {!selectedId ? (
        <button>Cadastrar</button>
      ):(
        <>
          <button onClick={onClearId}>Atualizar</button>
          <div>{selectedId}</div>
        </>
      )}
    </>
  )
}

export default Form