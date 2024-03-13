import React from 'react';
import {Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {WatchListItem} from '../../../../data/store/types/types';

const Chart = (item: WatchListItem) => {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  // const getValidData = (data) => {
  //   if (!data) {
  //     return {labels: [], datasets: []};
  //   }
  //   if (!Array.isArray(data.history) || data.history.length === 0) {
  //     return {labels: [], datasets: []};
  //   }
  //   const validData = data.history.filter(item => {
  //     if (!item.hasOwnProperty('t') || !item.hasOwnProperty('p')) {
  //       return false;
  //     }
  //     if (isNaN(item.t) || isNaN(item.p)) {
  //       return false;
  //     }
  //     return true;
  //   });

  //   const labels = validData.map((item, index) =>
  //     index % 2 === 0 ? item.t : '',
  //   );
  //   const datasets = [
  //     {
  //       data: validData.map(item => item.p),
  //       color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  //       strokeWidth: 2,
  //     },
  //   ];

  //   return {
  //     labels,
  //     datasets,
  //     legend: ['Historical Prices for ' + item?.item?.symbol ?? ''],
  //   };
  // };

  const getValidData = (data) => {
    if (!data || !data.history) {
      return { labels: [], datasets: [] };
    }
    const validData = data.history.filter(item => {
      if (!item.hasOwnProperty('t') || !item.hasOwnProperty('p')) {
        return false;
      }
      if (isNaN(item.t) || isNaN(item.p)) {
        return false;
      }
      return true;
    });
  
    const labels = validData.map((item, index) =>
      index % 2 === 0 ? item.t : '',
    );
    const datasets = [
      {
        data: validData.map(item => item.p),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ];
  
    return {
      labels,
      datasets,
      legend: ['Historical Prices for ' + (item?.item?.symbol ?? '')],
    };
  };
  

  return (
    <>
      {item?.item ? (
        <LineChart
          data={getValidData(item.item)}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{borderRadius: 16}}
          yAxisLabel={'price'}
          xAxisLabel={'time'}
          verticalLabelRotation={45}
          horizontalLabelRotation={45}
        />
      ) : (
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>
          {'No chart avaliable'}
        </Text>
      )}
    </>
  );
};

export default Chart;
