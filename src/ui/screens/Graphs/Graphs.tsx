import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import Chart from '../../components/atoms/Chart/Chart';
import graphStyles from './Graphs.style';
import EmptyState from '../../components/atoms/EmptyState/EmptyState';
import defaultStrings from '../../../localization/default';
function Graphs() {
  const {watchList} = useContext(AppContext);
  const styles = graphStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {watchList.length > 0 ? (
          <FlatList
            data={watchList}
            renderItem={({item}) => <Chart data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <EmptyState text={defaultStrings.empty.graph} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Graphs;
