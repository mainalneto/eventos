import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import './evento-cadastro.css';
import Navbar from '../../components/navbar';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';

function EventoCadastro(props){
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoatual, setFotoAtual] = useState();
    const [fotonova, setFotoNova] = useState();
    
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    
    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() =>{
        if(props.match.params.id){

        firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado =>{
           setTitulo(resultado.data().titulo)
           setTipo(resultado.data().tipo)
           setDetalhes(resultado.data().detalhes)
           setData(resultado.data().data)
           setHora(resultado.data().hora)
           setFotoAtual(resultado.data().foto)

             
      });
    }
      
  },[carregando])


    

function cadastrar(){
   setMsgTipo(null);
   setCarregando(1);

         storage.ref(`imagens/${fotonova.name}`).put(fotonova).then(() => {
             db.collection('eventos').add ({
             titulo: titulo,
             tipo: tipo,
             detalhes: detalhes,
             data: data,
             hora: hora,
             usuario: usuarioEmail,
             visualizacoes: 0,
             foto: fotonova.name,
             publico: 1,
             criacao: new Date()
             }).then(() => {
                setMsgTipo('sucesso');
             }).catch(erro => {
             setMsgTipo('erro');
             
         });
});
}

function atualizar(){
   setMsgTipo(null);
   if(fotonova)
   storage.ref(`imagens/${fotonova.name}`).put(fotonova);
         
             db.collection('eventos').doc(props.match.params.id).update ({
             titulo: titulo,
             tipo: tipo,
             detalhes: detalhes,
             data: data,
             hora: hora,
             foto: fotonova ? fotonova.name : fotoatual
            
             }).then(() => {
                setMsgTipo('sucesso');
             }).catch(erro => {
             setMsgTipo('erro');
             
         });

}




   return(
       <>
       <Navbar/>
       <div className="col-12 mt-5">
         <div className="row">
            <h3 className="mx-auto font-weight-bold mt-5">{props.match.params.id ? 'Atualizar evento' : 'Novo evento'}</h3>
         </div>
    
    <form>
        <div className="form-group">
           <label>Título:</label>
           <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}/>

        </div>
        <div className="form-group">
           <label>Tipo do evento</label>
           <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo}>
           <option disabled selected value>--Selecione um tipo--</option>
           <option>Festa</option>
           <option>Teatro</option>
           <option>Show</option>
           <option>Passeio</option>
           <option>Trilha</option>
           <option>Corrida</option>
           <option>Pedal</option>
           <option>Aniversário</option>
           <option>Chá</option>
         </select>
        </div>
        <div className="form-group">
           <label>Descrição do evento:</label>
           <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes}/>

        </div>
    <div className="form-group row">
        <div className="col-6">
           <label>Data do evento:</label>
           <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data}/>
            </div>
        <div className="col-6">
           <label>Hora do evento:</label>
           <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora}/>
            </div>
        </div>
        <div className="form-group">
           <label>Upload foto do evento: {props.match.params.id ? '(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)' : null}</label>
           <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>

        </div>
              <div className="row">
                 {
                   <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar evento' : 'Publicar evento'}</button>
                  }
               </div>
        
    </form>

    <div className="msg-login text-blue text-center my-2 font-weight-bold">
       {msgTipo === 'sucesso' && <span>Evento publicado com sucesso!</span>}
    
       {msgTipo === 'erro' && <span>Não foi possível publicar o evento</span>}
    </div> 

 </div>
       </>
   )


}

export default EventoCadastro;