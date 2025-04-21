import React from 'react'

function List({Permission, onSelectId}) {

  console.log('Permission List - ', Permission)

  const handleClick = (id) => {
    onSelectId(id); // Passa o ID para o App
  };

  return (
    <>
      {Permission ? 
        <button onClick={() => handleClick(51)}>Editar</button>
      :
        <button>Cadastrar</button>
      }
    </>
  )
}

export default List