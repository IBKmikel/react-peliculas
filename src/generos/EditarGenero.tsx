// import { useParams, useNavigate } from 'react-router-dom';
import FormularioGeneros from "./FormularioGeneros";
// import { useEffect, useState } from 'react';
// import axios, { AxiosResponse } from 'axios';
import { urlGeneros } from "../utils/endpoints";
import { generoDTO, generoCreacionDTO } from './generos.module';
// import { useNavigate, useParams } from "react-router-dom";
// import Cargando from "../utils/Cargando";
// import MostratErrores from "../utils/MostrarErrores";
import EditarEntidad from "../utils/EditarEntidad";

export default function EditarGenero(){
    
    return(
        <>
        <EditarEntidad<generoCreacionDTO, generoDTO> url={urlGeneros} urlIndice='/generos' nombreEntidad="Generos">
            {(entidad, editar) => <FormularioGeneros modelo={entidad}
                onSubmit={async valores => {
                    await editar(valores)
                    // await new Promise(r => setTimeout(r, 3000))
                    // console.log(valores)
                }}
            />}
        </EditarEntidad>
        
            
        
        </>
    )
}