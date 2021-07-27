import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';
import {Rating} from 'react-native-ratings';
import ModalVideo from '../components/ModalVideos';
import {getMovieByIdApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

export default function Movie(props) {
  const {route} = props;
  const {id} = route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    getMovieByIdApi(id).then(response => {
      setMovie(response);
    });
  }, [id]);
  if (!movie) return null;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTitle movie={movie} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieRating
          voteCount={movie.vote_count}
          voteAverage={movie.vote_average}
        />
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.viewGenres}>
          {map(movie.genres, genre => {
            <Text key={genre.id} style={styles.genre}>
              Genre: {genre.name}
            </Text>;
          })}
        </View>
        <Text style={styles.overview}>Release: {movie.release_date}</Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
}

function MovieImage(props) {
  const {posterPath} = props;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500/${posterPath}`}}
      />
    </View>
  );
}

function MovieTrailer(props) {
  const {setShowVideo} = props;

  return (
    <View style={styles.viewPlay}>
      <Button
        color="#fff"
        size={6}
        style={styles.play}
        onPress={() => setShowVideo(true)}>
        WATCH NOW
      </Button>
    </View>
  );
}

function MovieTitle(props) {
  const {movie} = props;

  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
    </View>
  );
}

function MovieRating(props) {
  const {voteCount, voteAverage} = props;
  const media = voteAverage / 2;
  const {theme} = usePreferences();

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{margin: 15}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 315,
  },
  viewPlay: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  play: {
    backgroundColor: '#828282',
    marginTop: 5,
    marginRight: 20,
    borderRadius: 100,
    paddingHorizontal: 3,
  },
  viewInfo: {
    marginHorizontal: 20,
  },
  viewGenres: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 20,
    color: '#fff',
  },
  viewRating: {
    justifyContent: 'flex-end',
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'justify',
    color: '#fff',
  },
});
