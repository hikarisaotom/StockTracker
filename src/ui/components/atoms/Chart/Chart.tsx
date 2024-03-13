import React from 'react';
import {Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {WatchListItem} from '../../../../data/store/types/types';

const Chart = ({item}: WatchListItem) => {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const getValidData = (data: WatchListItem|undefined) => {
    if (!data || !data.history) {
      return {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
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
    if (validData === undefined || validData.length <= 0) {
      return {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
    }
    const labels = validData.map(item => convertNumbers(item.p ?? 0));
    const datasets = [
      {
        data: validData.map((item, index) => (index % 2 === 0 ? item.p : '')),
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
  function convertNumbers(number) {
    const suffixes = ['', 'K', 'M', 'B'];
    function formatNumber(n) {
      const formatNumber = new Intl.NumberFormat('en-US');
     return formatNumber.format(n);
    }


    function getScale(n) {
      return Math.floor(Math.log10(n) / 3);
    }

    function convert(number) {
      const scale = getScale(number);
      const suffix = suffixes[scale];
      const formattedValue = formatNumber(number / Math.pow(1000, scale));
      return formattedValue + suffix;
    }

    return convert(number);
}
  return (
    <>
      {item?.history ? (
        <LineChart
          data={getValidData(item)}
          width={Dimensions.get('window').width}
          height={300}
          chartConfig={chartConfig}
          bezier
          style={{borderRadius: 16}}
          verticalLabelRotation={20}
          horizontalLabelRotation={20}
        />
      ) : (
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>
          {'No chart avaliable for '+item.symbol}
        </Text>
      )}
    </>
  );
};

export default Chart;
