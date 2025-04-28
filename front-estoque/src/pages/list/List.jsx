import React, { useEffect, useState } from 'react'
import ApiGet from './ApiGet'
import '../../app.css'

function List({Permission, onSelectId}) {

  // console.log('Permission List - ', Permission)
  const [Products, setProducts] = useState([])

  useEffect(() => {
    const FetchApiGet = async () => {
      try{
        const response = await ApiGet.getProducts()
        setProducts(response)
      }catch(err){
        console.log(err)
      }
    }

    FetchApiGet()
  }, [])

  const handleSubmitUpdate = (event, id) => {
    try{
      onSelectId(id)
    }catch(err){
      console.log(err)
    }
  }

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
                      <th>Categoria</th>
                      <th>Qtd</th>
                      <th>Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Products.filter(product => product.id !== undefined).map(product =>(
                      <tr key={product.id} className='tr-table'>
                          <td title={product.name} className='list-td-name-product'>{product.name}</td>
                          <td>R${product.price}</td>
                          <td>{product.promotion? 'Sim' : 'Não'}</td> 
                          <td>R${product.price_promotion}</td>
                          <td>{product.category.name}</td>
                          <td>{product.stock_quantity}</td>
                          <td className='td-position-button'>
                            <button onClick={(e) => handleSubmitUpdate(e, product.id)}>&#128221;</button>
                            <button>&#10060;</button>
                            <button>&#128722;</button>
                          </td>
                      </tr>
                    ))}
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