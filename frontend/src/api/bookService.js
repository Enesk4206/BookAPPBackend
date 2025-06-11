import api from "./axiosConfig"


export const getAllBooks = async ()=>{
    const response = await api.get('/book/all-books');
    return response.data;
}

export const createBook = async(formData)=>{
    const response = await api.post('/book/create', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
    });
    return response.data;
}
export const updateBook = async(id,book)=>{
    const response = await api.put(`/book/update/${id}`,book);
    return response.data;
}
export const deleteBook = async(id)=>{
    const response = await api.delete(`/book/delete/${id}`);
    return response.data;
}