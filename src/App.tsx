
import './App.css';
import { landingPageDTO } from './peliculas/Peliculas.module';
// import PeliculaIndividual from './peliculas/PeliculaIndividual';
import ListadoPeliculas from './peliculas/ListadoPeliculas';
import { useEffect, useState } from 'react';
import Button from './utils/Button';
import Menu from './utils/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import IndiceGeneros from './generos/IndiceGeneros';
// import LandingPage from './LandingPage';
import rutas from './route-config';
import configurarValidaciones from './validaciones';
import AutenticacionContext from './auth/AutenticacionContext'
import { claim } from './auth/auth.model.s';
import { obtenerClaims } from './auth/manejadorJWT';
import { configurarInterceptor } from './utils/Interceptores';

configurarValidaciones();
configurarInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([
    // {nombre: 'email', valor: 'felipe@hotmail.com'},
    // {nombre: 'role', valor: 'admin'}
  ]);
  useEffect(() => {
    setClaims(obtenerClaims());
  }, [])

  function actualizar(claims: claim[]){
    setClaims(claims);
  }

  function esAdmin(){
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'admin') > -1;
  }

  // const peliculaPrueba: pelicula ={
  //   id: 1, titulo: 'Spider-Man: Far from Home',
  //   poster: 'https://cdn2.mediotiempo.com/uploads/media/2019/05/22/imagenes-spider-man-far-from.jpeg'
  // }
  return (
    <BrowserRouter>
    <AutenticacionContext.Provider value={{claims, actualizar}}>

      <Menu />
        <div className='container'>
          <Routes>
            {/* <Route path='/' element={<LandingPage/>}/>
            
            <Route path='/generos' element={<IndiceGeneros/>}> */}

            {rutas.map(ruta => 
            //<Route key={ruta.path} path={ruta.path} element={<ruta.element/>}>

            <Route key={ruta.path} path={ruta.path} 
              element={ruta.esAdmin && !esAdmin() ? 
              <>No tienes permisos para acceder a este componente</> 
              : <ruta.element/>}
            >
          </Route>)}
              
          </Routes>
          {/* <PeliculaIndividual pelicula={peliculaPrueba}/> */}
        </div>
    </AutenticacionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
