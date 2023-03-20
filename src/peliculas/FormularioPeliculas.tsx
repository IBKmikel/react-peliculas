import { Form, Formik, FormikHelpers } from 'formik';
import { peliculaCreacionDTO } from "./Peliculas.module";
import * as Yup from 'yup';
import FormGroupText from '../utils/FormGroupText';
import FormGroupCheckbox from '../utils/FormGroupCheckbox';
import FormGroupFecha from '../utils/FormGroupFecha';
import FormGroupImagen from '../utils/FormGroupImagen';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
import SelectorMultiple from '../utils/SelectorMultiple';
import { generoDTO } from '../generos/generos.module';
import { useState } from 'react';
import { selectorMultipleModel } from '../utils/SelectorMultiple';
import { cineDTO } from '../cines/cines.module';
import TypeAheadActores from '../actores/TypeAheadActores';
import { actorPeliculaDTO } from '../actores/actores.module';
import FormGroupMarkdown from '../utils/FormGroupMarkdown';

export default function FormularioPeliculas(props: formularioPeliculasProps){
    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));

    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

    const [actoresSelecionados, setActoresSeleccionados] = 
    useState<actorPeliculaDTO[]>(props.actoresSeleccionados);

    function mapear(arreglo: {id: number, nombre: string}[]): selectorMultipleModel[]{
        return arreglo.map(valor => {
            return {llave: valor.id, valor: valor.nombre}
        })
    }

    return(
        <Formik
            initialValues={props.modelo}
            onSubmit={(valores, acciones) => {
                valores.generosIds = generosSeleccionados.map(valor => valor.llave);
                valores.cinesIds = cinesSeleccionados.map(valor => valor.llave);
                valores.actores = actoresSelecionados;
                props.onSubmit(valores, acciones);
            }}
            validationSchema={Yup.object({
                titulo: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
            })}
        >
            {formikProps => (
                <Form>
                    <FormGroupText label='Titulo' campo='titulo' />
                    <FormGroupCheckbox label='En cines' campo='enCines' />
                    <FormGroupText label='Trailer' campo='trailer' />
                    <FormGroupFecha campo='fechaLanzamiento' label='Fecha Lanzamiento' />
                    <FormGroupImagen campo='poster' label='Poster' imagenURL={props.modelo.posterURL} />
                    <FormGroupMarkdown campo='resumen' label='Resumen' />

                    <div className='form-group'>
                        <label>Generos</label>
                        <SelectorMultiple seleccionados={generosSeleccionados}
                        noSeleccionados={generosNoSeleccionados}
                        onChange={(seleccionados, noSeleccionados) => {
                            setGenerosSeleccionados(seleccionados);
                            setGenerosNoSeleccionados(noSeleccionados);
                        }}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Cines</label>
                        <SelectorMultiple seleccionados={cinesSeleccionados}
                        noSeleccionados={cinesNoSeleccionados}
                        onChange={(seleccionados, noSeleccionados) =>{
                            setCinesSeleccionados(seleccionados);
                            setCinesNoSeleccionados(noSeleccionados);
                        }}
                        />
                    </div>

                    <div className='form-group'>
                        <TypeAheadActores
                            onAdd={actores =>{
                                setActoresSeleccionados(actores);
                            }}
                            onRemove={actor => {
                                const actores = actoresSelecionados.filter(x => x !== actor);
                                setActoresSeleccionados(actores);
                            }}
                            actores={actoresSelecionados}
                            listadoUI={(actor: actorPeliculaDTO) => 
                            <>
                                {actor.nombre} / <input placeholder='Personaje'
                                type='text' value={actor.personaje}
                                onChange={e => {
                                    const indice = actoresSelecionados.findIndex(x => x.id === actor.id);
                                    const actores = [...actoresSelecionados];
                                    actores[indice].personaje = e.currentTarget.value;
                                    setActoresSeleccionados(actores);
                                }} />
                            </>}
                        />
                    </div>

                    <Button disabled={formikProps.isSubmitting} type='submit'>Enviar</Button>
                    <Link className='btn btn-secondary' to='/'>Cancelar</Link>
                </Form>
            )}

        </Formik>
    )
}

interface formularioPeliculasProps{
    modelo: peliculaCreacionDTO;
    onSubmit(valores: peliculaCreacionDTO, acciones: FormikHelpers<peliculaCreacionDTO>): void;
    generosSeleccionados: generoDTO[];
    generosNoSeleccionados: generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actoresSeleccionados: actorPeliculaDTO[];
}