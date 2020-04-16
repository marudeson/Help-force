import React , {useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';


export default function NewIncident(){
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [value , setValue] = useState('');
    const history = useHistory();

    const instId = localStorage.getItem('instId');
   async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,

        };
        try{
            await api.post('incidents' , data , {
                headers:{
                    Authorization: instId,
                }
            })
            history.push('/profile');

        }catch(err){

            alert('erro ao cadastrar');
        }


    }
return(
    <div className="new-incident">
        <div className="content">
            <section>
                <img src={logo} alt="help-force"/>
                <h1>Register new case</h1>
                <p>describe in detail the cases.</p>
                
       <Link className="back-link" to="/profile">
        <FiArrowLeft size={16} color="#00a1ff"/>return
           
           </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Case title"
               value={title}
                onChange={e => setTitle(e.target.value)}/>

                <textarea 
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}/>/>
                
                
                <input
                 placeholder="value"
                 value={value}
                onChange={e => setValue(e.target.value)}/>/>
                
                
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    </div>
);

}