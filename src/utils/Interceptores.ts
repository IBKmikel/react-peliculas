import axios, { AxiosHeaders } from 'axios';
import { obtenerToken } from '../auth/manejadorJWT';

export function configurarInterceptor(){
    axios.interceptors.request.use(
        // function(config){
        //     const token = obtenerToken();

        //     if(token){
        //         config.headers = `bearer ${token}`;
        //         //config.headers['Authorization'] = `${token}`;
        //     }

        //     return config;
        // },
        async config => {
            const token = await obtenerToken();

            if(token){
                config.headers ={
                    ...config.headers,
                    Authorization: `Bearer ${token}`
                };

                //axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
                // config.headers = {...config.headers,} as AxiosHeaders;
                // config.headers.set('
                // Authorization: `bearer ${token}`')
                //config.headers.common = config.headers.common ?? {};
                // config.headers.common.Authorization = `Bearer ${token}`;
                //(config.headers as AxiosHeaders).set('Authorization', `bearer ${token}`)
                // config.headers.Authorization = 'bearer ' + token;
                //config.headers['Authorization'] = `${token}`;
            }

            return config;
        },
        function(error){
            return Promise.reject(error);
        }
    )
}