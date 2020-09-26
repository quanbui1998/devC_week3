import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PieChart from './PieChart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function SummaryResult({ summaryResultData, onResetGame }) {
  const totalGame =
    summaryResultData.numWon +
    summaryResultData.numLose +
    summaryResultData.numTied;

  function getPercent(num) {
    if (totalGame === 0) return 0;
    return Math.floor((num * 10000.0) / totalGame) / 100;
  }

  function generateDataChart() {
    return [
      {
        value: summaryResultData.numWon,
        color: '#00e600',
        percent: getPercent(summaryResultData.numWon),
      },
      {
        value: summaryResultData.numLose,
        color: '#ff3333',
        percent: getPercent(summaryResultData.numLose),
      },
      {
        value: summaryResultData.numTied,
        color: '#999999',
        percent: getPercent(summaryResultData.numTied),
      },
    ];
  }

  const [labelWidth, setLabelWidth] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        setParentWidth(width);
      }}
    >
      <View style={styles.headerWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='pie-chart' size={28} color='black' />
          <Text style={styles.titleLabel}>Summary result: </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onResetGame();
          }}
          style={styles.resetButton}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='reload' size={18} color='white' />
            <Text style={styles.textResetButton}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>

      {totalGame > 0 ? (
        <View style={styles.pieChartWrapper}>
          <PieChart data={generateDataChart()} height={300} />
          <Text
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => {
              setLabelWidth(width);
            }}
            style={[
              {
                left: parentWidth / 2 - labelWidth / 2,
              },
              styles.totalLabel,
            ]}
          >
            {totalGame}
          </Text>
        </View>
      ) : (
        <Text>No games were played.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resetButton: {
    borderRadius: 8,
    backgroundColor: '#e67300',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  textResetButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
  pieChartWrapper: {
    justifyContent: 'center',
    marginTop: 10,
  },
  totalLabel: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '500',
  },
});
