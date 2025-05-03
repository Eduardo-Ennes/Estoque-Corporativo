import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../../app.css'

function Card() {

  const [Card, setCard] = useState([])
  const [Price, setPrice] = useState()

  useEffect(() => {
    const GetCard = async() => {
      const card_storage = localStorage.getItem('card')
      const price_storage = localStorage.getItem('price')
      if(card_storage != null && price_storage != null){
        const card = JSON.parse(card_storage)
        const price = JSON.parse(price_storage)
        setCard(card)
        setPrice(price['price'])
      }
    }
    GetCard()
  }, [])

  return (
    <>
      {Card.length > 0 ? (
        <div className='div-card'>
          <div className='div-card-contein'>
            {Card.map(product => (
              <>
                <p key={product.id} className='div-card-contein-p-name'>{product.name}</p>
                <div className='div-card-contein-spanqtd-and-price'>
                  <span className='span-card-qtd'><Link className='Link-span-qtd'>-</Link><p>{product.quantity}</p><Link className='Link-span-qtd'>+</Link></span>
                  {product.promotion ? 
                    <p className='div-card-contein-price'>R${product.price_promotion}</p>
                  :
                    <p className='div-card-contein-price'>R${product.price}</p>
                  }
                </div>
              </>
            ))}
          </div>
        </div>
      ):(
        <div className='div-card'>
          <h1 className='H1-title-card-payments-empty'>Carrinho vazio!</h1>
        </div>
      )}
      
      <div className='div-card-payments'>
        <span className='div-card-span-payments'>
          <p>Total:</p>
          <p>R${Price}</p>
        </span>
        <Link className='Link-card-payments'>Fechar Pedido</Link>
      </div>
    </>
  )
}

export default Card