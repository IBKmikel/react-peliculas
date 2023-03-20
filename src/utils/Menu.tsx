import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Autorizado from "../auth/Autorizado";
import Button from "./Button";
import { logout } from '../auth/manejadorJWT';
import { useContext } from "react";
import AutenticacionContext from "../auth/AutenticacionContext";

export default function Menu(){
    const claseActiva = 'active';
    const {actualizar, claims} = useContext(AutenticacionContext);

    function obtenerNombreUsuario(): string{
        return claims.filter(x => x.nombre === 'email')[0]?.valor;
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className={({isActive}) => (isActive ? 'navbar-brand active' : 'navbar-brand inactive' )} to="/">React Películas</NavLink>
                <div className="collapse navbar-collapse" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/peliculas/filtrar">Filtrar Peliculas</NavLink>
                        </li>
                        <Autorizado role="admin"
                            autorizado={<>
                                <li className="nav-item">
                                <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/generos">Géneros</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/actores">Actores</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/cines">Cines</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/peliculas/crear">Crear Peliculas</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link inactive' )} to="/usuarios">Usuarios</NavLink>
                                </li>
                            </>}
                        />
                    </ul>
                    <div className="d-flex">
                        <Autorizado 
                            autorizado={<>
                            <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
                            <Button className="nav-link btn btn-link" onClick={() => {
                                logout();
                                actualizar([]);
                            }}>Log out</Button>
                            </>}
                            noAutorizado={<>
                                <Link to='/registro' className='nav-link btn btn-link'>
                                    Registro
                                </Link>
                                <Link to='/login' className='nav-link btn btn-link'>
                                    Login
                                </Link>
                            </>}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}