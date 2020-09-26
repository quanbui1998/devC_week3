import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text, TSpan } from 'react-native-svg';

export default function CustomPieChart({ data, height }) {
  const pieData = data
    .filter((item) => item.value > 0)
    .map((item, index) => ({
      value: item.value,
      svg: {
        fill: item.color,
        onPress: () => {},
      },
      percent: item.percent,
      key: `pie-${index}`,
    }));

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={14}
          stroke={'black'}
          strokeWidth={0.2}
        >
          <TSpan x={pieCentroid[0]} y={pieCentroid[1] - 12} fontSize={26}>
            {data.value}
          </TSpan>
          <TSpan x={pieCentroid[0]} y={pieCentroid[1] + 12}>
            {'(' + data.percent + '%)'}
          </TSpan>
        </Text>
      );
    });
  };

  return (
    <PieChart
      innerRadius={'40%'}
      outerRadius={'95%'}
      style={{ height: height }}
      data={pieData}
      sort={() => true}
    >
      <Labels />
    </PieChart>
  );
}
