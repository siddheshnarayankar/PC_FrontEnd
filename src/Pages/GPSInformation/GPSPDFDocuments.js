import React from 'react';
import { Document, Page, Text, View, StyleSheet,Font,Image } from '@react-pdf/renderer';
import { Table, Input, Button, Space,Select,Tag } from "antd";
import fron from '../../font/Poppins-Regular.ttf';
import moment from 'moment';
 

 

 const BORDER_COLOR = '#bfbfbf';
const BORDER_STYLE = 'solid';
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;

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
  imageCell:{
    padding:'5px 5px',
    flexGrow: 1,
    flexShrink:1,
    flexBasis: '100px',
    width:'100px',
    height:'60px',
    fontFamily:'Poppins-Regular',
    fontSize:'9px',
  },
  image: {
    width: "50%",
    padding: 10
  },
  header:{
    padding:15,
    display:'flex',
    marginBottom:15
  }
});
// Create Document Component
export  const MyDocument = (props) => (

  <Document>
     <Page  size="A4" wrap >
       <View style={styles.header} >
        <Text style={{fontSize:'14px',fontWeight:600,marginBottom:8}}>(CMIS)-GPS APP Users Report</Text>
         <Text style={{fontSize:'14px',marginBottom:8}}>{
           props.filterDate && props.filterDate.length?'From: '+ moment(props.filterDate[0]).format('DD-MM-YYYY') + ', To: ' + moment(props.filterDate[1]).format('DD-MM-YYYY'):null
         }</Text>
           <Text style={{fontSize:'14px'}}>Total Records:{props.rows && props.rows.length}</Text>
       </View>
       
      <View style={styles.tbl}> 
        <View  style={styles.tableHeader}>
           <Text  style={styles.indexCell}>अ.क्र.</Text>
            <Text  style={styles.firstCell}>आरोपीचे नाव</Text>
            <Text  style={styles.cell}>पोलीस स्टेशन</Text>
            <Text  style={styles.cell}>USER NAME</Text>
            <Text  style={styles.imageCell}>फोटो</Text>
            {/* <Text  style={styles.cell}>GPS LOCATION</Text> */}
            <Text  style={styles.cell}>गस्त वेळ</Text>
            <Text  style={styles.cell}>Counts</Text>
            <Text  style={styles.cell}>मिळून आला / नाही</Text>
        </View>
    {

    props && props.rows && props.rows.map((item,index)=>(
      
      <View key={index} style={styles.row}  wrap={false}>
            <Text  style={styles.indexCell}>{index + 1}</Text>
            <Text   fixed={true} style={[styles.firstCell,{ wordBreak: 'break-all' }]}>{item.name }</Text>
            <Text fixed={true}  style={[styles.cell,{ wordBreak: 'break-all' }]}>{item.districtName}</Text>
            <Text  style={styles.cell}>{item.userName}</Text>
            {
              item.image!==null || item.image?(
                <Image style={styles.imageCell} src={`https://pcimageupload.s3.ap-south-1.amazonaws.com/${item.image}`}  /> 
              ):<Text  style={styles.imageCell}>NO IMAGE</Text>
            }
             
            {/* <Text  style={styles.cell} >{item.latitude} {item.longitude}</Text> */}
            <Text  style={styles.cell}>{moment(item.gpstimedate).format('DD-MM-YYYY')}</Text>
            <Text  style={styles.cell}>{item.counts}</Text>
            <Text  style={styles.cell}>{item.status === 1?'होय':'नाही'}   {item.statusDetails}</Text>
    </View>
    ))
    }
   

      </View>
    </Page>
  </Document>
);
