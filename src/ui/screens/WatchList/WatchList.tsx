import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import InformationCard from '../../components/molecules/InformationCard/InformationCard';
import watchListStyles from './WatchList.style';

function WatchList() {
  const {watchList} = useContext(AppContext);
  const styles = watchListStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={watchList}
          renderItem={({item}) => (
            <InformationCard symbol={item.symbol} price={item.price} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default WatchList;
