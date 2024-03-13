import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import InformationCard from '../../components/molecules/InformationCard/InformationCard';
import watchListStyles from './WatchList.style';
import EmptyState from '../../components/atoms/EmptyState/EmptyState';
import defaultStrings from '../../../localization/default';
import graphStrings from '../../../localization/graph';

function WatchList() {
  const {watchList} = useContext(AppContext);
  const styles = watchListStyles;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      {watchList.length > 0 ? (
        <View style={styles.subContainer}>
          <Text style={styles.title}>{graphStrings.definitions.title}</Text>
          <FlatList
            data={watchList}
            renderItem={({item}) => <InformationCard stock={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      ) : (
        <EmptyState text={defaultStrings.empty.title} />
      )}
    </SafeAreaView>
  );
}

export default WatchList;
