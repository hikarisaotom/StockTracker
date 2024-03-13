import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../../data/store/Context';
import Chart from '../../components/atoms/Chart/Chart';
import graphStyles from './Graphs.style';
function Graphs() {
  const {watchList} = useContext(AppContext);
  const styles = graphStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={watchList}
          renderItem={({item}) => <Chart data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default Graphs;
