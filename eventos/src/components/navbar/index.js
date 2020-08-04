import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function Navbar(){

  const dispatch = useDispatch();

 return(

<nav class="navbar navbar-expand-lg">
   <span class="navbar-brand"><img src="start_logo_novo.png" alt="" height="35"/></span> 
   <span className="nome-logo navbar-brand text-black font-weight-bold"> Start Brasil </span> 
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-nav">
      <ul className="navbar-nav">
      <li class="nav-item"><Link className="nav-link" to="/">Home</Link> </li>
    
     {

       useSelector(state => state.usuarioLogado) > 0? 

       <>
       <li class="nav-item"><Link className="nav-link" to="/eventocadastro">Publicar evento</Link> </li>
       <li class="nav-item"><Link className="nav-link" to="/eventos/meus">Meus Eventos</Link> </li>
       <li class="nav-item"><Link className="nav-link" onClick={() => dispatch({type: 'LOG_OUT'})}>Sair</Link> </li>
       </>
        :
       <>
       <li class="nav-item"><Link className="nav-link" to="/novousuario">Cadastrar</Link> </li>
       <li class="nav-item"><Link className="nav-link" to="/login">Login</Link> </li>
       </>
        
     }
      

      
     </ul>
    </div>
  </div>
</nav>



 )

}

export default Navbar;
