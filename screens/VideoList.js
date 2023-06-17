import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { VideoData } from '../VideoData';

const Search = ({filteredVideoList,setFilteredVideoList}) =>{

  const [search, setSearch] = useState('');

  const searchList=(text)=>{
    setSearch(text);
      
    setTimeout(() => {
      setFilteredVideoList(VideoData.filter(value=> value.title.toLowerCase().includes(text.toLowerCase())));
      
    }, 1000);
  }

  return(
    <View>
    <TextInput value={search} onChangeText={(text)=> searchList(text)} style={styles.searchBar}/>
    </View>
  )
}

export function VideoList({navigation}) {
  const [filteredVideoList, setFilteredVideoList] = useState([]);

  useEffect(() => {
    setFilteredVideoList(VideoData);
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={{alignSelf:'center'}}>
        <Search filteredVideoList={filteredVideoList} setFilteredVideoList={setFilteredVideoList}/>
      {
        filteredVideoList.map((value,index)=>(
          <TouchableOpacity style={styles.listContainer} key={index} onPress={()=>{navigation.navigate('Video',value)}}>
            <Image source={{uri:value?.thumbnailUrl}} style={styles.imageStyle}/>
            <Text style={styles.titleStyle}>
              {value?.title}
            </Text>
          </TouchableOpacity>
        ))
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    imageStyle: {
      width:50,
      height: 50
    },
    listContainer: {
      flexDirection: "row",
      alignItems:'center',
      margin:2,
      backgroundColor: 'lightgrey',
    },
    titleStyle:{
      marginLeft:10,
    },
    searchBar:{
      height:25,
      width: 200,
      alignSelf:'center',
      backgroundColor:'lightgrey',
      borderRadius:10,
      outlineStyle:'none',
      padding:10,
      margin:10
    }
});
