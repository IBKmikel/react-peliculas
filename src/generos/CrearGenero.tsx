import { Field, Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '../utils/Button';
import * as Yup from 'yup';
import FormGroupText from "../utils/FormGroupText";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO } from './generos.module';
import axios from 'axios';
import { urlGeneros } from '../utils/endpoints';
import MostratErrores from '../utils/MostrarErrores';
import { useState } from 'react';

export default function CrearGenero(){
    const history = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);
    
    async function crear(genero:generoCreacionDTO){
        try{
            await axios.post(urlGeneros, genero);
            history("/generos");
        }
        catch(error){
            // console.error(error)
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Crear Género</h3>
            <MostratErrores errores={errores}/>
            <FormularioGeneros modelo={{nombre: ''}}
                onSubmit={async valores => {
                    //await new Promise(r => setTimeout(r, 3000))
                    //console.log(valores)
                    await crear(valores);
                }}
            />
            {/* <Formik initialValues={{
                nombre: ''
            }}
            onSubmit={
                async values => {
                    await new Promise(r => setTimeout(r, 100));
                    console.log(values);
                }}

                validationSchema={Yup.object({
                    nombre: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
                })}
            >
                {(formikProps) => (
                    <Form>
                        <FormGroupText campo="nombre" label="Nombre"/>

                        <Button disabled={formikProps.isSubmitting} type="submit">Salvar</Button>
                        <Link className="btn btn-secondary" to="/generos">Cancelar</Link>
                    </Form>
                )}
                

            </Formik> */}
            {/*  {/* <Button onClick={() => history('/generos')}>Salvar</Button> */}
        </>
    )
}