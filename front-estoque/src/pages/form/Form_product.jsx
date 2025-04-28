import {React, useState, useEffect} from 'react'
import ApiRetriver from './ApiRetriver'
import "../../app.css"

function Form_product({selectedId, onClearId}) {

  const [ValidationId, setValidationId] = useState(false)
  const [Product, setProduct] = useState([])
  const [ProductApi, setProductApi] = useState([])
  const [Categorys, setCategorys] = useState([])

  useEffect(() => {
    const RetriverApi = async (pk) => {
      if(pk !== null && Number.isInteger(pk) && pk !== undefined){
        const response = await ApiRetriver.Retriver(pk)
        console.log(response.data.categorys)
        if(response.status === 200){
          setProduct(response.data.product)
          setProductApi(response.data.product)
          setCategorys(response.data.categorys)
          setValidationId(true)
        }else{
          setValidationId(false)
        }
      }
    }
  
    RetriverApi(selectedId)
  }, [selectedId])
  
  const handleSubmitUpdated = (event) => {
    try{
      event.preventDefault()
      const form = Product
      console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*')
      console.log('Formulário: ', form)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
      {ValidationId === false ? (
        <button>Cadastrar</button>
      ):(
        <>
          <form className="form_update" onSubmit={handleSubmitUpdated}>
            <div className="div_form_update_contein_1">
              <input
              type="text"
              name="name"
              value={Product.name}
              onChange={(e) => setProduct({...Product, name: e.target.value})}/>

              <input
              type="number"
              name="price"
              value={Product.price}
              onChange={(e) => setProduct({...Product, price: e.target.value})}/>

              <label htmlFor=""> 
              Produto em Promoção?
                <input
                type="checkbox"
                name="promotion"
                checked={Product.promotion}
                onChange={(e) => setProduct({...Product, promotion: e.target.checked})}
                id="promotion"
                />
                
              </label>
            </div>

            <div className="div_form_update_contein_2">
              <input 
              type="number" 
              name="price_promotion"
              value={Product.price_promotion}
              onChange={(e) => setProduct({...Product, price_promotion: e.target.value})}/>

              <input 
              type="number" 
              name="quantity"
              value={Product.stock_quantity}
              onChange={(e) => setProduct({...Product, stock_quantity: e.target.value})}/>

              <label htmlFor="">
                Categoria?
                <select 
                value={Product.category}
                onChange={(e) => setProduct({...Product, category: e.target.value})}
                >
                  {Categorys.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))} 
                </select>
              </label>
            </div>
            
            <div className="div_form_update_contein_buttons">
              <button type="submit">Atualizar</button>
              <button onClick={onClearId}>Cadastrar</button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default Form_product