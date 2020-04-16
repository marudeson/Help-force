import React , { useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png'

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data ={
      name,
      email,
      whatsapp,
      city,
      uf,
    };
     try{
   const response = await api.post('instituicao', data);
   alert(`seu ID de acesso: ${response.data.id}`);
   history.push('/');
     }catch(err){
       alert('erro no cadastro tente novamente');
     }

  }
    return(
        <div className="register-container">
          <div className="content">
            <section>
              <img src={logo} alt="help-force"/>
              <h1>Register</h1>
              <p>With a few steps you can save lives, register.</p>
              <Link className="back-link" to="/">
                <FiArrowLeft size={20} color="#00a1ff"/>I already have registration
              </Link>
            </section>
            <form onSubmit={handleRegister}>
              <input 
              placeholder="Institution Name"
              value={name} 
              onChange={e => setName(e.target.value)}/>

              <input 
              type="email" 
              placeholder="email"
              value={email} 
              onChange={e => setEmail(e.target.value)}/>

              <input 
              placeholder="whatsapp"
              value={whatsapp} 
              onChange={e => setWatsapp(e.target.value)}/>

              <div className="input-group">
                <input 
                placeholder="City"
                value={city} 
              onChange={e => setCity(e.target.value)}/>

                <input
                 placeholder="uf" 
                 style={{width: 80}}
                 value={uf} 
              onChange={e => setUf(e.target.value)}/>
              </div>
              <button className="button" type="submit">Register</button>
            </form>
          </div>
        </div>
    );


  }