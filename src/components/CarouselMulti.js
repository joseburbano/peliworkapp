import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {Rating} from 'react-native-ratings';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import {getMovieByIdApi} from '../api/movies';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

//sacamos la dimencion de nuesras pantallas
const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

export default function CarouselMulti(props) {
  const {data, navigation} = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={item => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
}

//aca es donde renderizamos cada una de las peliculas
function RenderItem(props) {
  const {data, navigation} = props;
  const {id, title, poster_path} = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500/${poster_path}`;

  const [moviee, setMoviee] = useState(null);
  useEffect(() => {
    getMovieByIdApi(id).then(response => {
      setMoviee(response);
    });
  }, [id]);

  if (!moviee) return null;

  const onNavigation = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title} numberOfLines={1}>
          {title}
        </Title>
        <MovieRating
          voteCount={moviee.vote_count}
          voteAverage={moviee.vote_average}
        />
      </View>
    </TouchableWithoutFeedback>
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
        imageSize={13}
        style={{margin: 5}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  image: {
    width: '85%',
    height: 170,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});
