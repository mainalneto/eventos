import React, { useState } from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import Navbar from '../../components/navbar';



function Login(){
  
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function logar(){
     firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
      setMsgTipo('sucesso');  
       setTimeout(() => {
        dispatch({type: 'LOG_IN', usuarioEmail: email}); 
       },2000);

      
    }).catch(erro => {
      setMsgTipo('erro'); 
     });
    

  }

  

return(
  <>
  <Navbar/>
    <div className= "login-content d-flex align-itens-center">

            {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' />: null}

    <form className="form-signin mx-auto">
  <div className="text-center mb-4">
    <img className="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
    <span class="navbar-brand text-black font-weight-bold"><img src="start_logo_novo.png" alt="" height="35"/></span> 
    <h1 className="nome-logo h3 mb-3 font-weight-normal font-weight-bold">Start Brasil</h1>
  </div>

  
    <input onChange={(e) => setEmail(e.target.value) } type="email" id="inputEmail" class="form-control my-2" placeholder="Email"/>
    <input onChange={(e) => setSenha(e.target.value) } type="password" id="inputPassword" class="form-control my-2" placeholder="Senha"/>
      
  
  <button onClick={logar} className="btn btn-lg btn-block btn-login my-2" type="button">Entrar</button>

<div className="msg-login text-blue text-center my-2 font-weight-bold">
    {msgTipo === 'sucesso' && <span>Você está conectado!</span>}
    
    {msgTipo === 'erro' && <span>Email ou senha incorretos</span>}
</div>

<div className= "opcoes-login font-weight-bold mt-3 ">
<Link to='novousuario' className="mx-2">Quero Cadastrar</Link>
<span className="text-white"> &#9830;</span>
<Link to='usuariorecuperarsenha' className="mx-2">Recuperar Senha</Link>


</div>
</form>
</div>
</>

)

}
export default Login;



