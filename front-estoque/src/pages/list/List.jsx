import React, { useState } from 'react'
import '../../app.css'

function List({Permission, onSelectId}) {

  // console.log('Permission List - ', Permission)
  const [Products, setProducts] = useState([1])

  const handleClick = (id) => {
    onSelectId(id); // Passa o ID para o App
  };

  return (
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

      
        {Permission ? 
          <>
            <div className='div-table-position-fixed'>
              {Products.length > 0 ? (
                <table className='table'>
                  <thead className='thead-list-fixed'>
                    <tr className='tr-table'>
                      <th className='list-th-size-name'>Nome do produto</th>
                      <th>preço</th>
                      <th>Promoção</th>
                      <th>Preço.P</th>
                      <th>Qtd</th>
                      <th>Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className='tr-table'>
                      <td title='hahahahahhahhaha' className='list-td-name-product'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, vero!</td>
                      <td>R$200,00</td>
                      <td>Sim</td>
                      <td>R$180,00</td>
                      <td>20</td>
                      <td className='td-position-button'>
                        <button>&#128221;</button>
                        <button>&#10060;</button>
                        <button>&#128722;</button>
                      </td>
                    </tr>

                    <tr className='tr-table'>
                      <td title='hahahahahhahhaha' className='list-td-name-product'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, vero!</td>
                      <td>R$200,00</td>
                      <td>Sim</td>
                      <td>R$180,00</td>
                      <td>20</td>
                      <td className='td-position-button'>
                        <button>&#128221;</button>
                        <button>&#10060;</button>
                        <button>&#128722;</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ):(
                <h1 className='H1-title-list-empty'>Você não possui produtos em estoque ou cadastrados!</h1>
              )}
            </div>
          </>
        :
          <>
          <div className='div-table-position-fixed-false'>
            {Products.length > 0 ? ( 
              <table className='table'>
                <thead className='thead-list-fixed'>
                  <tr className='tr-table'>
                    <th className='list-th-size-name'>Nome do produto</th>
                    <th>preço</th>
                    <th>Promoção</th>
                    <th>Preço.P</th>
                    <th>Qtd</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='tr-table'>
                    <td title='hahahahahhahhaha' className='list-td-name-product'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, vero!</td>
                    <td>R$200,00</td>
                    <td>Sim</td>
                    <td>R$180,00</td>
                    <td>20</td>
                    <td className='td-position-button'>
                      <button className='button-add-card'>Carrinho</button>
                    </td>
                  </tr>

                  <tr className='tr-table'>
                    <td title='ha' className='list-td-name-product'>Camisa Fluminense</td>
                    <td>R$2.000,00</td>
                    <td>Sim</td>
                    <td>R$180,00</td>
                    <td>20</td>
                    <td className='td-position-button'>
                      <button className='button-add-card'>Carrinho</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              ):(
                <h1 className='H1-title-list-empty'>Você não possui produtos em estoque ou cadastrados!</h1>
              )}
            </div>
          </>
        }
        
    </>
  )
}

export default List