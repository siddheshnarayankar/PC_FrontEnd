import React from 'react';
import { Document, Page, Text, View, StyleSheet,Font,Image } from '@react-pdf/renderer';
import { Table, Input, Button, Space,Select,Tag } from "antd";
import fron from '../../../font/Poppins-Regular.ttf';
import moment from 'moment';
 

 

const COL1_WIDTH = 40;
 

Font.register({
  family: 'Poppins-Regular',
  src: fron
})

const styles = StyleSheet.create({
  tbl :{
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '0 0 0 0',
    padding: 0,
  },
  tableHeader:{
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '0 0 0 0',
    padding: 0,
    flexDirection:'row',
    justifyContent:'space-around',
    border:'1px solid #f1f1f1',
    backgroundColor:"#f1f1f1",
    minHeight:30,
    maxHeight:60
  },
  row:{
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 0,
    flexDirection:'row',
    justifyContent:'space-around',
    border:'1px solid #f1f1f1',
    minHeight:30,
    maxHeight:60
  },
  cell:{
    padding:'5px 5px',
    fontFamily:'Poppins-Regular',
    fontSize:'9px',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100px',
    flexWrap: 'wrap',
    width:'100px',
    wordBreak: 'break-all',
    
  },
  firstCell:{
    padding:'5px 5px',
    flexGrow: 1,
    flexShrink:2,
    fontSize:'9px',
    flexBasis: '160px',
    width:'160px',
    fontFamily:'Poppins-Regular',
    
  },
  indexCell:{
    padding:'5px 5px',
    flexGrow: 1,
    flexShrink:1,
    fontSize:'9px',
    flexBasis: '40px',
    wordBreak: 'break-all',
    width:'40px',
    fontFamily:'Poppins-Regular',
    backgroundColor:"#f1f1f1",
 
  },
  
  header:{
    padding:15,
    display:'flex',
    marginBottom:15
  }
});
// Create Document Component
export  const Document1 = (props) => (
 
  <Document>
     <Page  size="A4" wrap >
       <View style={styles.header} >
        <Text style={{fontSize:'14px',fontWeight:600,marginBottom:8,  fontFamily:'Poppins-Regular',}}>(CMIS)-पोलिस स्टेशन निहाय गस्त आकडेवारी अहवाल</Text>
         <Text style={{fontSize:'14px',marginBottom:8}}>{
           props.filterDate?'From: '+ moment(props.filterDate && props.filterDate.startDate).format('YYYY/MM/DD') + ', To: ' + moment(props.filterDate && props.filterDate.endDate).format('YYYY/MM/DD'):null
         }</Text>
           <Text style={{fontSize:'14px'}}>Total Records:{props.rows && props.rows.length}</Text>
       </View>
       
      <View style={styles.tbl}> 
        <View  style={styles.tableHeader}>
           <Text  style={styles.indexCell}>अ.क्र.</Text>
            <Text  style={styles.cell}>पोलिस ठाणे</Text>
            <Text  style={styles.cell}>एकूण आरोपी</Text>
            <Text  style={styles.cell}>मिळून आलेला</Text>
            <Text  style={styles.cell}>मिळून न आलेला</Text>
            {/* <Text  style={styles.cell}>GPS LOCATION</Text> */}
            <Text  style={styles.cell}>उर्वरित आरोपी</Text>
        </View>
      </View>

         {
             
            props && props.rows && props.rows.map((item,index)=>(
            
            <View key={index} style={styles.row}  wrap={false}>
                    <Text  style={styles.indexCell}>{index + 1}</Text>
                    <Text  style={styles.cell}>{item.policeThane}</Text>
                    <Text  style={styles.cell}>{item.totalCriminals}</Text>
                    <Text  style={styles.cell}>{item.totalFindCriminals}</Text>
                    <Text  style={styles.cell}>{item.totalUnFindCriminals}</Text>
                    <Text  style={styles.cell}>{item.remainingCriminals}</Text>
            </View>
            ))
            }
    </Page>
  </Document>
  
);
