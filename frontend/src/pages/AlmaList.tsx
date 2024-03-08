import { getInvitationRequest, getThemeRequest } from "../api/general";
import { useQueryClient, useQuery} from "@tanstack/react-query";



export interface Invitation {
    name:string,
    assist:boolean,
    comments:string,
}

export interface Theme {
    name:string,
    song:string,
}



const Lista1= ()=>{
    const queryClient  = useQueryClient();
    const {data, error} = useQuery({
        queryKey:['invitation'],
         queryFn: getInvitationRequest,
    });
      const { data: data2, error: error2 } = useQuery({
        queryKey:['theme'],
         queryFn: getThemeRequest,
         
    });



    return (
   <div className="flex flex-row items-center justify-center">
            {/* Encabezado de la tabla para los datos de invitaciones */}
            <table className="mt-6 border justify-center mr-2">
                <thead className="border">
                    <tr>
                        <th className="px-6 border">Nombre Completo</th>
                        <th className="px-6 border">Asiste</th>
                        <th className="px-6 border">Comentarios y Recomendaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeo para los datos de invitaciones */}
                    {data?.map((invitation: Invitation) => (
                        <tr key={invitation.name} className="text-center break-words text-balance">
                            <td className="px-12 py-2 border">{invitation.name}</td>
                            <td className="px-12 py-2 border">{invitation.assist ? 'Sí' : 'No'}</td>
                            <td className="px-12 py-2 border">{invitation.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Encabezado de la tabla para los datos de temas */}
            <table className="mt-6 border justify-center">
                <thead className="border">
                    <tr>
                        <th className="px-6 border">Nombre Completo</th>
                        <th className="px-6 border">Canción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeo para los datos de temas */}
                    {data2?.map((theme: Theme) => (
                        <tr key={theme.name} className="text-center break-words text-balance">
                            <td className="px-12 py-2 border">{theme.name}</td>
                            <td className="px-12 py-2 border">{theme.song}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}




export default Lista1;