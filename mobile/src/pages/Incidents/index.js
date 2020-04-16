import React ,{useState , useEffect} from 'react';
import {View, FlatList , Image , Text , TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import po from '../../assets/po.png';
import styles from './styles';

export default function Incidents(){
    const [incidents , setIncidents] = useState([]);
    const [total , setTotal] = useState(0);
    const [page , setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
    function navigationToDetail(incident){
        navigation.navigate('Detail' , {incident});
    }
    
    async function loadIncidents(){
        if(loading){
          return;
      }
        if(total > 0 && incidents.length == total){
          return;
      }
       setLoading(true);
       const response = await api.get('incidents', {params:{page}});
       setIncidents([...incidents,...response.data]); //anexa dois vetores dentro de um
       setTotal(response.headers['x-total-count']);
       setPage(page + 1);
       setLoading(false);

      }
      useEffect(()=>{
          loadIncidents();
    } ,[]);


    return(

        <View style={styles.container}>
           <View style={styles.header}>
               <Image source={po}/>
               <Text style={styles.headerText}>
               Total de<Text style={styles.headerTextBold}> {total} casos.</Text>
               </Text>
           </View>
           <Text style={styles.title}>BEM-VINDO</Text>
           <Text style={styles.description}>Escolha uma instituição, e salve vidas.</Text>
           <FlatList
             data={incidents}
             style={styles.incidentList}
             keyExtractor={incident=> String(incident.id)}
             showsVerticalScrollIndicator={false}
             onEndReached={loadIncidents}
             onEndReachedThreshold={0.2}
             renderItem={({item: incident})=>(<View style={styles.incident}>
             <Text style={styles.incidentProperty}>Instituição:</Text> 
             <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR' , {style:'currency' , currency:'BRL'}).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={()=>navigationToDetail(incident)}>
            <Text style={styles.detailsButtonText}>ver mais detalhes</Text>

            <Feather name='arrow-right' size={16} color={'#00a1ff'}/>
            </TouchableOpacity>
            
            </View>

          )}
          />
          
          
     </View>
    );
}