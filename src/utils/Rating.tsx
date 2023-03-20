import { useState, useEffect, useContext } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Rating.css';
import AutenticacionContext from '../auth/AutenticacionContext';
import Swal from 'sweetalert2';

export default function Rating(props: ratingProps){
    const {claims} = useContext(AutenticacionContext);
    const [maximoValorArr, setMaximoValorArr] = useState<number[]>([]);
    const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);

    useEffect(() => {
        setMaximoValorArr(Array(props.maximovalor).fill(0));
    }, [props.maximovalor])

    function manejarMouseOver(voto: number){
        setValorSeleccionado(voto);
    }

    function manejarClick(voto: number){
        if(claims.length === 0){
            Swal.fire({title: 'Error', text:'Debes loguearte para votar', icon: 'error'});
            return;
        }
        setValorSeleccionado(voto);
        props.onChange(voto);
    }

    return(
        <>
        {maximoValorArr.map((valor, indice) => <FontAwesomeIcon
            icon="star" key={indice}
            onMouseOver={() => manejarMouseOver(indice + 1)}
            onClick={() => manejarClick(indice + 1)}
            className={`fa-lg pointer ${valorSeleccionado >= indice + 1 ? 'checked' : null}`}
        />)}
        </>
        
    )
}

interface ratingProps{
    maximovalor: number;
    valorSeleccionado: number;
    onChange(voto: number): void;
}