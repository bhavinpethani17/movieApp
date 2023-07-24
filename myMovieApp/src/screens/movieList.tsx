import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {movieListStyle} from '../styles/movieListStyle';
import MoviePoster from '../component/moviePoster';
import Loader from '../component/loader';
import ErrorMessage from '../component/errorMessage';
import {fetchPopularMovie} from '../redux/services';
import {useReduxDispatch, useReduxSelector} from '../redux/store';
import {errorMessages} from '../utils/theam';

//function for display popular movie list with use of poster component
function MovieList(): JSX.Element {
  const popularMovies = useReduxSelector(
    (state: any) => state.popularMovie.popularMovies,
  );
  const loading = useReduxSelector((state: any) => state.popularMovie.loading);
  const error = useReduxSelector((state: any) => state.popularMovie.error);

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovie());
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={errorMessages.movieListNotFound} />;
  }

  return (
    <View testID="movieListTestID" style={movieListStyle.container}>
      <FlatList
        data={popularMovies}
        renderItem={({item}) => (
          <MoviePoster posterImage={item.poster_path} movieId={item.id} />
        )}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={movieListStyle.columnWrapper}
      />
    </View>
  );
}

export default MovieList;
