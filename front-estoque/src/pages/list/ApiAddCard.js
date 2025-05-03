import axios from 'axios'

class OperationCard{
    async AddCard(pk, qtd){
        try{
            // this.cacela_tudo()
            await this.Local_Storage()
            const stotage_card = localStorage.getItem('card') 
            const storage_price = localStorage.getItem('price') 
            if(stotage_card != null && storage_price != null){
                const card = await JSON.parse(stotage_card)
                const price = await JSON.parse(storage_price)
                const data = [card, price]
                const response = await axios.put(`http://localhost:8000/card/${pk}/${qtd}/`, data)
                const response_set_storage = await this.set_Local_Storage(response.data[0], response.data[1]['price'], )
                return response_set_storage.message
            }else{
                return{message: 'Houve um error ao criar no LocalStorage!'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async cacela_tudo(){
        localStorage.clear()
    }

    async set_Local_Storage(card, price){
        localStorage.setItem('card', JSON.stringify(card))
        localStorage.setItem('price', JSON.stringify({'price': price}))
        return{message: 'ok'}
    }

    async Local_Storage(){
        const value_stotage_card = localStorage.getItem('card')
        const value_storage_price = localStorage.getItem('price')
        if(value_stotage_card != null && value_storage_price != null){
            return{message: 'Existe!'}
        }else{
            localStorage.setItem('card', JSON.stringify([]))
            localStorage.setItem('price', JSON.stringify({'price': 0}))
            return{message: 'Acbamos de criar!'}
        } 
    }
}

export default new OperationCard()