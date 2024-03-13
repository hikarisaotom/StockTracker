/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import Chart from '../../components/atoms/Chart/Chart';
import graphStyles from './Graphs.style';
import EmptyState from '../../components/atoms/EmptyState/EmptyState';
import defaultStrings from '../../../localization/default';
import graphStrings from '../../../localization/graph/Localization';

function Graphs() {
  const {watchList} = useContext(AppContext);
  const styles = graphStyles;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      {watchList.length > 0 ? (
        <View style={styles.subContainer}>
          <Text style={styles.title}>{graphStrings.definitions.title}</Text>
          <FlatList
            data={watchList}
            renderItem={({item}) => <Chart data={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      ) : (
          <EmptyState text={defaultStrings.empty.graph} />
        )}

    </SafeAreaView>
  );
}

export default Graphs;

