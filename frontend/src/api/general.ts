import {axi} from "./useAxios.ts";

export const createInvitationRequest = async ( name:string, assist:boolean) => {
    await axi.post(`backend_/post/`, {name, assist});
 };
 
