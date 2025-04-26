import axios from 'axios'

class ApiGetList{
    async getProducts(){
        try{
            const response = await axios.get('http://localhost:8000/products/')
            return response.data
        }catch(err){
            console.log(err)
            return {error: 'Houve um error no servidor, tente novamente!', code: 500}
        }
    }
}

export default new ApiGetList()