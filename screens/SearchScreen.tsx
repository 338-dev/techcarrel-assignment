import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Platform, Alert } from 'react-native'
import { Searchbar, Snackbar } from 'react-native-paper'
import { connect, useSelector } from 'react-redux'
import { fetchMovies, fetchDataFailure } from '../Store/action'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { RootState } from '../Store'
import { debounce } from "lodash";

export const width: number = Platform.OS !== 'web' ? Dimensions.get('window').width : 400;

export interface InterfaceMovies {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
};

function SearchScreen ({ fetchMovies, fetchDataFailure }) {
  const [searchText, setSearchText] = useState<string>('');

  const navigation = useNavigation();
  const imageUrlPath: string = 'http://image.tmdb.org/t/p/w500/';
  const moviesData: InterfaceMovies[] = useSelector((state: RootState) => state.moviesData.data);
  const isDataLoading: boolean = useSelector((state: RootState) => state.moviesData.isLoading);
  const errorMessage: string = useSelector((state: RootState) => state.moviesData.error);
  const snackBarVisible = errorMessage?.length>0?true:false;
  const debouncedFunction=debounce(()=>fetchMovies(searchText),500);

 
  useEffect(() => {

    debouncedFunction();
    return ()=>{
      debouncedFunction.cancel();
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={()=>fetchDataFailure(null)}
        action={{
          label: 'Ok',
          onPress:()=>{fetchDataFailure(null)}
        }}> 
        {errorMessage}

        </Snackbar>
      <Searchbar
      placeholder="Search"
      onChangeText={(text) => setSearchText(text)}
      value={searchText}style={styles.searchBar}clearButtonMode='never'
      />
        {isDataLoading&&<ActivityIndicator animating={true} color={MD2Colors.red800} style={{marginTop: 10}}/>}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroller}>
        {
          moviesData?.map((movie, index) => (
            <TouchableOpacity key={index} style={[index !== moviesData.length ? styles.tabBorder : {}, styles.movieTabStyle]} onPress={() => navigation.navigate('MovieDetails', movie)}>
              <Image source={{ uri: imageUrlPath + movie?.poster_path }} style={styles.tabImage}/>
              <View>
                <Text style={styles.titleStyle}>{movie?.title?.length > 30 ? movie?.title.slice(0, 35) + '....' : movie?.title}</Text>
                <Text style={styles.releaseDate}>{movie?.release_date}</Text>
              </View>
            </TouchableOpacity>
        ))
      }
      </ScrollView>
    </View>
  )
}

const mapDispatchToProps = {
  fetchMovies,
  fetchDataFailure
}

export default connect(null, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  titleStyle: {
    marginLeft:5
  },
  searchBar: { 
    height: 55,
    marginTop: 10,
    width: '97%' 
  },
  releaseDate:{ 
    marginLeft: 5, 
    color: 'grey', 
    fontSize: 10 
  },
  movieTabStyle:{
    paddingVertical: 10, 
    marginHorizontal: 5, 
    flexDirection: 'row', 
    width: width * 0.95 
  },
  tabImage :{ 
    width: 40, 
    height: 40 
  },
  tabBorder:{ 
    borderBottomWidth: 1, 
    borderBottomColor: 'lightgrey' 
  },
  scroller: { 
    marginTop: 10 
  }
});
