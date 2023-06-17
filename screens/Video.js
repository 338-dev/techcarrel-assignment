import { StyleSheet, Text, View, Image} from 'react-native';


export function Video({route}) {
  const videoObj = route.params;
  

  return (
    <View style={styles.container}>
      <Image source={{uri:videoObj.thumbnailUrl}} style={{height:300,width:'100%'}}/>
      
      <Text style={styles.titleStyle}>
        {videoObj.title}
      </Text>
      <Text style={styles.desStyle}>
        {videoObj.description}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    width:'50%'
  },
    titleStyle:{
      fontSize:20,
      fontWeight:'500'
    },
});
