import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation , useRoute} from '@react-navigation/native';
import {View ,Text , Image ,  TouchableOpacity , Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import po from '../../assets/po.png';
import styles from './styles'; 

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const mesage = `Olá ${incident.name},Estou entrado em contato, gotaria de ajudar "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR' , {style:'currency' , currency:'BRL'}).format(incident.value)}}`;
       function navigateBack(){
        navigation.goBack()
       }

       function sendMail(){
           MailComposer.composeAsync({
               subject:`Heroi do caso: ${incident.title}`,
               recipients:[incident.email],
               body: mesage,  
           })

       }
       function sendWhatsapp(){
           Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${mesage}`);

       }
     return(
          <View style={styles.container}>
             <View style={styles.header}>
              <Image source={po}/>
                 <TouchableOpacity onPress={navigateBack}>
                  <Feather name="arrow-left" size={20} color="#00a1ff"/>
              </TouchableOpacity>
          </View>

          <View style={styles.incident}>
          <Text style={styles.incidentProperty , {marginTop:0}}>Instituição:</Text> 
     <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR' , {style:'currency' , currency:'BRL'}).format(incident.value)}</Text>


          </View>
          <View style={styles.contactBox}>
              <Text style={styles.forceTitle}>SALVE O DIA DE ALGUMA FORMA.</Text>
              <Text style={styles.forceTitle}>CONTAMOS COM
              VOCÊ!!</Text>

              <Text style={styles.forceDescription}>Entrer em contato.</Text>
              <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                      <Text style={styles.actionText}>Whatsapp</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.action} onPress={sendMail}>
                      <Text style={styles.actionText}>E-MAIL</Text>
                   </TouchableOpacity>
              </View>

          </View>

        </View>
    );
}