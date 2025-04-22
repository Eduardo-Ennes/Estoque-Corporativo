import React from 'react'
import '../../app.css'

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
        <>
          <nav className='nav-search'>
            <select name="select" className='select'>
              <option value="1">Tecnologia</option>
              <option value="2">Ferramenta</option>
              <option value="3">Roupa</option>
              <option value="4">Livro</option>
              <option value="5">Parafuso</option>
            </select>
            <div className='div-search-position'>
              <input type="text" className='search' placeholder='Buscar produto'/>
              <button className='button_icon-search'><span className="material-icons">search</span></button>
            </div>
          </nav>

          <div className='div-table-position-fixed'>
            <table className='table'>
              <thead>
                <tr className='tr-table'>
                  <th>Nome</th>
                  <th>preço</th>
                  <th>Promoção</th>
                  <th>Preço.P</th>
                  <th>Quantidade</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                <tr className='tr-table'>
                  <td title='hahahahahhahhaha'>Camisa Fluminense</td>
                  <td>R$200,00</td>
                  <td>Sim</td>
                  <td>R$180,00</td>
                  <td>20</td>
                  <td className='td-position-button'>
                    <button className='button-add-card'>Carrinho</button>
                  </td>
                </tr>
                <tr className='tr-table'>
                  <td title='ha'>Camisa Fluminense</td>
                  <td>R$200,00</td>
                  <td>Sim</td>
                  <td>R$180,00</td>
                  <td>20</td>
                  <td className='td-position-button'>
                    <button className='button-add-card'>Carrinho</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
    </>
  )
}

export default List