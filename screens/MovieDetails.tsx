import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export const MovieDetails = ({ route }) => {

  const movieDetails = route.params;
  const imageUrlPath: string = 'http://image.tmdb.org/t/p/w500/';

  return ( 
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{movieDetails?.title}</Text>
      <Text style={styles.releaseDate}>{movieDetails?.release_date}</Text>
      <View style={styles.imageDescContainer}>
        <View>
          <Image source={{ uri: imageUrlPath + movieDetails?.poster_path }} style={styles.imageStyle}/>
          <Text style={{ fontSize: 11 }}>Ratings {movieDetails?.vote_average.toPrecision(3)}/10</Text>
        </View>
        <Text style={styles.descriptionStyle}>{movieDetails?.overview?.length > 200 ? movieDetails?.overview?.slice(0, 300) + '...' : movieDetails?.overview}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10 
  },
  imageStyle: {
    width: 150,
    height: 200
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    backgroundColor: 'lightgrey'
  },
  titleStyle: {
    fontSize: 20 
  },
  searchBar: {
    height: 25,
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    outlineStyle: 'none',
    padding: 10,
    margin: 10
  },
  descriptionStyle:{ 
    marginLeft: 10, 
    flex: 1,
    fontFamily:'cursive'
  },
  releaseDate: { 
    fontSize: 10, 
    color: 'grey' 
  },
  imageDescContainer:{ 
    flexDirection: 'row', 
    marginTop: 10 
  }
});
