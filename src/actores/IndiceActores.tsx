//import { Link } from "react-router-dom";
import IndiceEntidad from "../utils/IndiceEntidad";
import { actorDTO } from "./actores.module";
import { urlActores } from '../utils/endpoints';

export default function IndiceActores(){
    return(
        <>
        {/* <h3>Indice Actores</h3>
        <Link to="crear">Crear Actor</Link> */}
            <IndiceEntidad<actorDTO>
                url={urlActores} urlCrear='crear' titulo="Actores" nombreEntidad="Actor">

                {(actores, botones) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actores?.map(actor =>
                            <tr key={actor.id}>
                                <td>
                                    {botones(`editar/${actor.id}`, actor.id)}

                                </td>
                                <td>
                                    {actor.nombre}
                                </td>
                            </tr>)}
                    </tbody>
                </>}


            </IndiceEntidad>
        </>
    )
}