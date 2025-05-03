import React, { useEffect, useState } from 'react'
import ApiGet from './ApiGet'
import ApiCard from './ApiAddCard'
import axios from 'axios'
import '../../app.css'

function List({Permission, onSelectId, ReloadList, changeReloadList, ReloadListDelete}) {

  const [Products, setProducts] = useState([])

  useEffect(() => {
    const FetchApiGet = async () => {
      try{
        const response = await ApiGet.getProducts()
        setProducts(response)
        changeReloadList()
        console.log("RODANDO...") // apenas duas vezes
      }catch(err){
        console.log(err)
      }
    }
    FetchApiGet()
  }, [ReloadList])

  const handleSubmitUpdate = (event, id) => {
    try{
      onSelectId(id)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (event, id) => {
    try{
      event.preventDefault()
      const confirmation = confirm("Tem certeza que deseja excluir este produto?")
      if(confirmation === false){
        return;
      }
      const response = await axios.delete(`http://localhost:8000/products/${id}/`)
      alert(response.data.message)
      ReloadListDelete()
    }catch(error){
      console.log(error)
    }
  }

  const handleCard = async (event, pk, qtd=1) => {
    try{
      event.preventDefault()
      const response = await ApiCard.AddCard(pk, qtd)
      console.log(response)
    }catch(error){
      console.log(error)
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
                    <th>Pro</th>
                    <th>Preço.P</th>
                    <th>Categoria</th>
                    <th>Qtd</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {Products.map(product => (
                    <tr key={product.id} className='tr-table'>
                        <td title={product.name} className='list-td-name-product'>{product.name}</td>
                        <td>R${product.price}</td>
                        <td className='td-position-promotion'>{product.promotion? 'Sim' : 'Não'}</td> 
                        <td>R${product.price_promotion}</td>
                        <td>{product.category.name}</td>
                        <td>{product.stock_quantity}</td>
                        <td className='td-position-button'>
                          <button onClick={(e) => handleSubmitUpdate(e, product.id)}>&#128221;</button>
                          <button type='button' onClick={(e) => handleDelete(e, product.id)}>&#10060;</button>
                          <button type='button' onClick={(e) => handleCard(e, product.id)}>&#128722;</button>
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
                  <th>Pro</th>
                  <th>Preço.P</th>
                  <th>Categoria</th>
                  <th>Qtd</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
              {Products.map(product =>(
                    <tr key={product.id} className='tr-table'>
                        <td title={product.name} className='list-td-name-product'>{product.name}</td>
                        <td>R${product.price}</td>
                        <td className='td-position-promotion'>{product.promotion? 'Sim' : 'Não'}</td> 
                        <td>R${product.price_promotion}</td>
                        <td>{product.category.name}</td>
                        <td>{product.stock_quantity}</td>
                        <td className='td-position-button'>
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
      }
        
    </>
  )
}

export default List