import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {size, map} from 'lodash';
import {Searchbar} from 'react-native-paper';
import {searchMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function Search() {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    //buscar cuando escriba mas de 3 letras
    if (size(search) > 3) {
      searchMoviesApi(search).then(response => {
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.textIni}>Hello, what do you want to watch?</Text>
      <Searchbar
        placeholder="Search"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        style={styles.serach}
        onChangeText={e => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.containers}>
          {map(movies, (movie, index) => {
            <Movie key={index} movie={movie} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {movie} = props;
  const {poster_path, title} = movie;
  return (
    <TouchableWithoutFeedback onPress={() => console.log('click')}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500/${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#51d1f6',
    color: '#fff',
    padding: '10%',
  },
  serach: {
    backgroundColor: '#51d1f0',
    borderRadius: 100,
    width: '100%',
    height: 40,
    color: '#fff',
  },
  textIni: {
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 25,
    padding: '10%',
    color: '#fff',
  },
  containers: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
