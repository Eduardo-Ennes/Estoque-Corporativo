import axios from 'axios'

class ApiRetriverUpdated{
    async Retriver(pk){
        try{
            const response = await axios.get(`http://localhost:8000/products/${pk}/`)
            return {data: response.data, status: 200}
        }catch(error){
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    async PutUpdate(id, form_updated){
        try{
            const response = await axios.put(`http://localhost:8000/products/${id}/`, form_updated)
            return response
        }catch(error){
            return {
                error: error.response.data,
                status: error.response.status
            };
        }
    }

    async PatchUpdate(id, form_updated){
        try{
            const response = await axios.patch(`http://localhost:8000/products/${id}/`, form_updated)
            return response
        }catch(error){
            if(error.response){
                return {
                    error: error.response.data,
                    status: error.response.status
                };
            }
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    async ApiPutAndPatchUpdated(form_api, form_updated, pk){
        const object_fields_is_equal = this.FormsIsEqual(form_api, form_updated)
        const object_fields_is_equal_length = Object.keys(object_fields_is_equal).length

        if(object_fields_is_equal_length >= 0 && object_fields_is_equal_length < 6){
            const object_to_api = this.ObjectPutOrPatch(form_api, form_updated, 'patch')
            const object_to_api_legth = Object.keys(object_to_api).length

            try{
                if(object_to_api_legth >= 1 && object_to_api_legth < 6){
                    console.log('PATCH!')
                    const response = await this.PatchUpdate(pk, object_to_api)
                    return response
            }
                if(object_to_api_legth === 6){
                    console.log('PUT')
                    const response = await this.PutUpdate(pk, form_updated)
                    return response
            }
        }catch(error){
            console.log(error)
            return {message: 'Houve um error no servidor, tente novamente.', code: 500}
        }
        }
        else{
            console.log('Você não atualizou nenhum campo')
            return{error: {'Field': ['Você não atualizou nenhum campo']}}
        }
    }

    FormsIsEqual(form_api, form_updated){
        const object_fields_is_equal = {}
        for(const campo in form_updated){
            if(form_updated[campo] === form_api[campo]){
                object_fields_is_equal[campo] = form_api[campo]
            }
        }

        return object_fields_is_equal
    }

    ObjectPutOrPatch(form_api, form_updated){ 
        const object_partial_fields = {}
        for(const key in form_updated){
            if(form_updated['promotion'] === true){
                if(form_updated[key] === form_api['promotion']){
                    object_partial_fields[key] = form_api[key]
                }
                else if(form_updated[key] === form_api['price']){
                    object_partial_fields[key] = Number.parseFloat(form_api['price'])
                }
                else if(form_updated[key] === form_api['price_promotion']){
                    object_partial_fields[key] = Number.parseFloat(form_api['price_promotion'])
                }
                else if(form_updated[key] != form_api[key]){
                    object_partial_fields[key] = form_updated[key]
                }
            }
            else{
                if(form_updated[key] != form_api[key]){
                    object_partial_fields[key] = form_updated[key]
                }
            }
        }

        return object_partial_fields
    }
}

export default new ApiRetriverUpdated()