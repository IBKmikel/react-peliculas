import { Link } from "react-router-dom";
import FormularioCines from './FormularioCines';
import { cineCreacionDTO, cineDTO } from './cines.module';
import { urlCines } from '../utils/endpoints';
import EditarEntidad from "../utils/EditarEntidad";

export default function EditarCines(){
    return(
        <>
        {/* <h3>Editar Cine</h3>
        <FormularioCines 
            modelo={{nombre: 'Puebla', latitud: 19.028450, longitud: -98.203964}}
            onSubmit={valores => console.log(valores)}
        /> */}
        <EditarEntidad<cineCreacionDTO, cineDTO> url={urlCines} urlIndice='/cines' nombreEntidad="Cines">
            {(entidad, editar) => <FormularioCines modelo={entidad}
                onSubmit={async valores => {
                    await editar(valores)
                }}
            />}
        </EditarEntidad>
        </>
    )
}