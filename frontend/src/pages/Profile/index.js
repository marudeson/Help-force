import React , {useState , useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom';
import { FiPower , FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Profile(){
    const [incidents , setIncdents] = useState([]);

    const history = useHistory();
    const instId = localStorage.getItem('instId');
    const instName = localStorage.getItem('instName');


  
    useEffect(()=> {
        api.get('profile' ,{
             headers:{
                 Authorization: instId,
                     }
                    }).then(response =>{
                        setIncdents(response.data)

                    })
    },
    [instId]);

    async function handleDeleteIncident(id){

        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: instId,
                }
            });
            setIncdents(incidents.filter(incident=> incident.id !== id))



        }catch(err){
            alert('erro ao deletar caso.')
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');


    }

    return(

        <div className="profile-container">
            <header>
                <img src={logo} alt="help-force"/>
                    <span>Welcome, {instName} !!</span>
                <Link className="button" to="/incidents/new">cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="red"/>
             </button>
            </header>
            <h1>Registered cases</h1>
            <ul>
               {incidents.map(incident => ( 
               <li key={incident.id}>
                    <strong>Case:</strong>
               <p>{incident.title}</p>
                    <strong>Description:</strong>
               <p>{incident.description}</p>
                    <strong>Value</strong>
               <p>{Intl.NumberFormat('pt-br',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                    <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#ff6677"/>
                    </button>
                </li>))}
                
                    
            </ul>
        </div>
    );
}
