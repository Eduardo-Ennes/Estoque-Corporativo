import {React, useState, useEffect} from 'react'
import ApiUpdated from './ApiRetriver'
import "../../app.css"

function Form_product_update({selectedId, onClearId}) {

  const [Product, setProduct] = useState([])
  const [ProductApi, setProductApi] = useState([])
  const [Categorys, setCategorys] = useState([])



  useEffect(() => {
    const RetriverApi = async (pk) => {
      if(pk !== null && Number.isInteger(pk) && pk !== undefined){
        const response = await ApiUpdated.Retriver(pk)
        if(response.status === 200){
          setProduct(response.data.product)
          setProductApi(response.data.product)
          setCategorys(response.data.categorys)
        }
      }
    }
  
    RetriverApi(selectedId)
  }, [selectedId])
  

  const handleSubmitUpdated = async (event) => {
    try{
      event.preventDefault()
      const response = await ApiUpdated.ApiPutAndPatchUpdated(ProductApi, Product)
      if(response.error){
        if(response.error.name){
          alert('O nome do produto não pode ter mais de 75 caracteres.')
          return;
        }
        if(response.error.non_field_errors){
          alert(response.error.non_field_errors[0])
          return;
        }
      }

      alert(response.data.message) 
      onClearId()
    }catch(error){
      console.log(error)
    }
  }



  return (
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
            onChange={(e) => setProduct({...Product, price: Number.parseFloat(e.target.value)})}/>

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
            onChange={(e) => setProduct({...Product, price_promotion: Number.parseFloat(e.target.value)})}/>

            <input 
            type="number" 
            name="quantity"
            value={Product.stock_quantity}
            onChange={(e) => setProduct({...Product, stock_quantity: Number.parseFloat(e.target.value)})}/>

            <label htmlFor="">
              Categoria?
              <select 
              value={Product.category}
              onChange={(e) => setProduct({...Product, category: Number.parseFloat(e.target.value)})}
              >
                {Categorys.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))} 
              </select>
            </label>
          </div>
          
          <div className="div_form_update_contein_buttons">
            <button type="submit">Atualizar</button>
            <button type="button" onClick={() => onClearId()}>Voltar</button>
          </div>
        </form>
    </>
  )
}

export default Form_product_update