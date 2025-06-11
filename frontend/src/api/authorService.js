import api from "./axiosConfig"



export const getAllAuthors = async ()=>{
    const response = await api.get('/author/all-authors');
    return response.data;
}

export const createAuthor = async (author)=>{
    const response = await api.post('/author/create',author);
    return response.data;
}

export const updateAuthor = async (id,author)=>{
    const response = await api.put(`/author/update/${id}`,author);
    return response.data;
}

export const deleteAuthor = async (id)=> {
    const response = await api.delete(`/author/delete/${id}`);
    return response.data;
}