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
  tableHeaderDates:{
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '0 0 0 0',
    padding: 0,
    flexDirection:'row',
    justifyContent:'flex-start',
    fontSize:'9px',
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
    flexBasis: '10px',
    wordBreak: 'break-all',
    width:'10px',
    fontFamily:'Poppins-Regular',
    backgroundColor:"#f1f1f1",
 
  },
  imageCell:{
    padding:'5px 5px',
    flexGrow: 1,
    flexShrink:1,
    flexBasis: '100px',
    width:'50px',
    height:'50px',
    fontFamily:'Poppins-Regular',
    fontSize:'9px',
    objectFit: 'contain',
    alignSelf:'flex-start',
    objectPosition:'center'
  },
  header:{
    padding:15,
    display:'flex',
    marginBottom:15
  },
 
});
// Create Document Component
export  const Document4 = (props) => (

  <Document>
     <Page  size="A4" wrap >
       <View style={styles.header} >
        <Text style={{fontSize:'14px',fontWeight:600,marginBottom:8,  fontFamily:'Poppins-Regular',}}>(CMIS)-अद्याप चेक न केलेले आरोपी</Text>
            <View  style={styles.tableHeaderDates}>
                    <Text style={{fontSize:'14px',marginBottom:8,marginRight:10}}>{
                props.filterDate?'From: '+ moment(props.filterDate && props.filterDate.startDate).format('DD-MM-YYYY'):null
                }</Text>
                    <Text style={{fontSize:'14px',marginBottom:8}}>{
                props.filterDate?'To: '+ moment(props.filterDate && props.filterDate.endDate).format('DD-MM-YYYY'):null
                }</Text>
            </View>
           <Text style={{fontSize:'14px',fontFamily:'Poppins-Regular'}}>एकूण आरोपी :{props.total && props.total}</Text>
       </View>
       
      <View style={styles.tbl}> 
        <View  style={styles.tableHeader}>
           <Text  style={styles.indexCell}>अ.क्र.</Text>
            <Text  style={styles.cell}>नाव</Text>
            <Text  style={styles.cell}>आरोपीचे पोलिस ठाण</Text>
            <Text  style={styles.cell}>Last Update</Text>
            <Text  style={styles.cell}>Count</Text>
            <Text  style={styles.imageCell}>फोटो</Text>
        </View>
      </View>

         {
             
            props && props.rows && props.rows.map((item,index)=>(
            
            <View key={index} style={styles.row}  wrap={false}>
                    <Text  style={styles.indexCell}>{index + 1}</Text>
                    <Text  style={styles.cell}>{item.name}</Text>
                    <Text  style={styles.cell}>{item.districtName}</Text>
                    <Text  style={styles.cell}>{ moment(item.lastUpdate && item.lastUpdate).format('DD-MM-YYYY')}</Text>
                    <Text  style={styles.cell}>{item.count}</Text>
                    {
                        item.photo?(
                            <Image style={styles.imageCell} src={`https://pcimageupload.s3.ap-south-1.amazonaws.com/${item.photo}`}  /> 
                        ):<Text  style={styles.imageCell}>NO IMAGE</Text>
                    }
            </View>
            ))
            }
    </Page>
  </Document>
);
