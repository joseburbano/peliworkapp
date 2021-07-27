import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Title} from 'react-native-paper';
import CarouselMulti from '../components/CarouselMulti';
import Search from '../components/Search';
import {getNewsMoviesApi, getTopRatedApi} from '../api/movies';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [topRated, setTopRated] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then(response => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getTopRatedApi().then(response => {
      setTopRated(response.results);
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Search />
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>RECOMMENDED FOR YOU</Title>
        {newMovies && (
          <CarouselMulti
            data={newMovies}
            top={topRated}
            navigation={navigation}
          />
        )}
        <Title style={styles.genresTitle}>TOP RATED</Title>
        {topRated && <CarouselMulti data={topRated} navigation={navigation} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    textAlign: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 13,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
