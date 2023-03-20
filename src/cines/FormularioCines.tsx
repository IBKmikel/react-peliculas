import { cineCreacionDTO } from './cines.module';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupText from '../utils/FormGroupText';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
// import Mapa from '../utils/Mapa';
import MapaFormulario from '../utils/MapaFormulario';
import { coordenadaDTO } from '../utils/coordenadas.module';
export default function FormularioCines(props: formularioCinesProps){
    function transformarCoordenadas(): coordenadaDTO[] | undefined {
        if(props.modelo.latitud && props.modelo.longitud){
            const respuesta: coordenadaDTO = {lat: props.modelo.latitud, lng: props.modelo.longitud}
            return [respuesta];
        }
        return undefined;
    }
 return(
    <div>
        <Formik
        initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            nombre: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
        })}
        >
        {(formikProps) =>(
            <Form>
                <FormGroupText label='nombre' campo='nombre' />
                <div style={{marginBottom: '1erm'}}>
                    <MapaFormulario campoLat='latitud' campoLng='longitud'
                        coordenadas={transformarCoordenadas()}
                    />
                </div>
                <Button disabled={formikProps.isSubmitting} type="submit">Salvar</Button>
                <Link className='btn btn-secondary' to="/cines">Cancelar</Link>
            </Form>
        )}
        </Formik>
    </div>
 )
}

interface formularioCinesProps{
    modelo: cineCreacionDTO;
    onSubmit(valores: cineCreacionDTO, acciones: FormikHelpers<cineCreacionDTO>): void;
}