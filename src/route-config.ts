import IndiceGeneros from './generos/IndiceGeneros';
import LandingPage from './LandingPage';
import CrearGenero from './generos/CrearGenero';
import EditarGenero from './generos/EditarGenero';
import EditarActores from './actores/EditarActores';
import IndiceActores from './actores/IndiceActores';
import CrearActores from './actores/CrearActores';
import CrearCines from './cines/CrearCines';
import EditarCines from './cines/EditarCines';
import IndiceCines from './cines/IndiceCines';
import CrearPeliculas from './peliculas/CrearPeliculas';
import EditarPeliculas from './peliculas/EditarPeliculas';
import FiltroPeliculas from './peliculas/FiltroPeliculas';
import DetallePelicula from './peliculas/DetallePelicula';

import RedireccionarALanding from './utils/RedireccionarALanding';
import Registro from './auth/Registro';
import Login from './auth/Login';
import IndiceUsuarios from './auth/IndiceUsuarios';

const rutas = [
    {path: '/generos/crear', element: CrearGenero, esAdmin: true},
    {path: '/generos/editar/:id', element: EditarGenero, esAdmin: true},
    {path: '/generos', element: IndiceGeneros, esAdmin: true},
    {path: '/actores/crear', element: CrearActores, esAdmin: true},
    {path: '/actores/editar/:id', element: EditarActores, esAdmin: true},
    {path: '/actores', element: IndiceActores, esAdmin: true},
    {path: '/cines/crear', element: CrearCines, esAdmin: true},
    {path: '/cines/editar/:id', element: EditarCines, esAdmin: true},
    {path: '/cines', element: IndiceCines, esAdmin: true},
    {path: '/pelicula/:id', element: DetallePelicula},
    {path: '/peliculas/crear', element: CrearPeliculas, esAdmin: true},
    {path: '/peliculas/editar/:id', element: EditarPeliculas, esAdmin: true},
    {path: '/peliculas/filtrar', element: FiltroPeliculas},
    
    {path: '/registro', element: Registro},
    {path: '/login', element: Login},
    {path: '/usuarios', element: IndiceUsuarios, esAdmin: true},

    {path: '/', element: LandingPage},
    {path: '*', element: RedireccionarALanding}
];

export default rutas;