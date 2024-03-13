import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import InformationCard from '../../components/molecules/InformationCard/InformationCard';
import watchListStyles from './WatchList.style';
import EmptyState from '../../components/atoms/EmptyState/EmptyState';
import defaultStrings from '../../../localization/default';

function WatchList() {
  const {watchList} = useContext(AppContext);
  const styles = watchListStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {watchList.length > 0 ? (
          <FlatList
            data={watchList}
            renderItem={({item}) => <InformationCard stock={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <EmptyState text={defaultStrings.empty.title} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default WatchList;
