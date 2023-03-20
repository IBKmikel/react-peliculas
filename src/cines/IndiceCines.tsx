// import { Link } from "react-router-dom";
import { cineDTO } from './cines.module';
import { urlCines } from '../utils/endpoints';
import IndiceEntidad from '../utils/IndiceEntidad';

export default function IndiceCines(){
    return(
        <>
        {/* <<h3>Indice Cines</h3>
        Link to="crear">Crear Cine</Link> */}
        <IndiceEntidad<cineDTO>
            url={urlCines} urlCrear='crear' titulo="Cines" nombreEntidad="Cine"
            >
                {(cines, botones) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cines?.map(cine =>
                            <tr key={cine.id}>
                                <td>
                                    {botones(`editar/${cine.id}`, cine.id)}

                                </td>
                                <td>
                                    {cine.nombre}
                                </td>
                            </tr>)}
                    </tbody>
                </>}
            
            </IndiceEntidad>
        </>
    )
}