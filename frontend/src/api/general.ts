import {axi} from "./useAxios.ts";


export const createInvitationRequest = async ( name:string, assist:boolean, comments:string) => {
       

    await axi.post(`/backend_/post/`, {name, assist, comments});
 };
 
export const createSongRequest = async ( name:string, song:string) => {
    await axi.post(`/backend_/post2/`, {name, song});
 };
 
export const getInvitationRequest = async () => {
    try {
     const response = await axi.get(`/backend_/get/`);
     console.log(response.data);
     return response.data;
     } catch (error) {
        throw new Error('Error 500');    
    }
    
 };

export const getThemeRequest = async () => {
    try {
     const response = await axi.get(`/backend_/get2/`);
     console.log(response.data);
          return response.data;  
     } catch (error) {
        throw new Error('Error 500');    
    }
    
 };
