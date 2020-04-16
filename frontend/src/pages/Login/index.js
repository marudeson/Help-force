import React , {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link , useHistory} from 'react-router-dom';
import api from  '../../services/api';
import './style.css';
import force from '../../assets/force.png';
import logo from '../../assets/logo.png';

export default function Login(){
    const [id , setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
    e.preventDefault();
    try{
        const response = await api.post('sessions' , {id});
         localStorage.setItem('instId' , id)
         localStorage.setItem('instName' , response.data.name);
         history.push('/profile');
        }catch(err){
           alert('Login failed');
        }

    }

return(
    <div className="Login-container">
        <section className="form"> 
          <img src={logo} alt="Help-force"/>
          <form onSubmit={handleLogin}>
            <h1>Welcome</h1>
            <input type="text" placeholder="Your id"
            value={id}
            onChange={e => setId(e.target.value)}
            />
            <button type="submit"  className="button">Logon</button>
            <Link className="back-link" to="/register">
            <FiLogIn size={20} color="#00a1ff"/>Sign-up</Link>
          </form>
        </section>
        <img src={force}  alt="Bem vindo"  width={596} height={574}/>

    </div>
);


}