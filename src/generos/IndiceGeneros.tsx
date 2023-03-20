// import { Link } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import axios, { AxiosResponse } from "axios";
import { generoDTO } from './generos.module';
import { urlGeneros } from '../utils/endpoints';
// import ListadoGenerico from "../utils/ListadoGenerico";
// import Button from "../utils/Button";
// import Paginacion from "../utils/Paginacion";
// import confirmar from '../utils/Confirmar';
import IndiceEntidad from "../utils/IndiceEntidad";

export default function IndiceGeneros(){
   

   
    return(
        <>
            <IndiceEntidad<generoDTO>
            url={urlGeneros} urlCrear='crear' titulo="Géneros" nombreEntidad="Género"
            >
                {(generos, botones) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generos?.map(genero =>
                            <tr key={genero.id}>
                                <td>
                                    {botones(`editar/${genero.id}`, genero.id)}

                                </td>
                                <td>
                                    {genero.nombre}
                                </td>
                            </tr>)}
                    </tbody>
                </>}
            
            </IndiceEntidad>
        </>
    )
}