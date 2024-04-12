import { getInvitationRequest, getThemeRequest } from "../api/general";
import { useQuery } from "@tanstack/react-query";

export interface Invitation {
  name: string;
  assist: boolean;
  comments: string;
}

export interface Theme {
  name: string;
  song: string;
}

const Lista1 = () => {
  const { data } = useQuery({
    queryKey: ["invitation"],
    queryFn: getInvitationRequest,
  });
  const { data: data2 } = useQuery({
    queryKey: ["theme"],
    queryFn: getThemeRequest,
  });

  return (
    <div className="min-h-screen z-0">
      <div className="flex flex-col lg:flex-row items-center justify-center font-bodie">
        {/* Encabezado de la tabla para los datos de invitaciones */}
        <table className="mt-6 justify-center mr-2 border-2 border-amber-300 overflow-x-auto">
          <thead className="border">
            <tr>
              <th className="px-6 border border-amber-300">Nombre Completo</th>
              <th className="px-6 border border-amber-300">Asiste</th>
              <th className="px-6 border border-amber-300">
                Comentarios y Recomendaciones
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeo para los datos de invitaciones */}
            {data?.map((invitation: Invitation) => (
              <tr
                key={invitation.name}
                className="text-center break-words text-balance font-medium"
              >
                <td className="px-12 py-2 border border-amber-300">
                  {invitation.name}
                </td>
                <td className="px-12 py-2 border border-amber-300">
                  {invitation.assist ? "Sí" : "No"}
                </td>
                <td className="px-12 py-2 border border-amber-300">
                  {invitation.comments}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Encabezado de la tabla para los datos de temas */}
        <table className="mt-6 justify-center border-2 border-amber-300 overflow-x-auto">
          <thead className="border">
            <tr>
              <th className="px-6 border border-amber-300">Nombre Completo</th>
              <th className="px-6 border border-amber-300">Canción</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeo para los datos de temas */}
            {data2?.map((theme: Theme) => (
              <tr
                key={theme.name}
                className="text-center break-words text-balance font-medium"
              >
                <td className="px-12 py-2 border border-amber-300">
                  {theme.name}
                </td>
                <td className="px-12 py-2 border border-amber-300">
                  {theme.song}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lista1;
