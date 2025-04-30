import axios from 'axios'

class ReturnCategories{
    async GetCategories(){
        try{
            const response = await axios.get('http://localhost:8000/returncategories/')
            return response.data
        }catch(error){
            console.log(error)
            return{message: 'Houve um error no servidor, tente novamente.', code: 500}
        }
    }
}

export default new ReturnCategories()