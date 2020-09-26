import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OptionChoosed from './src/components/OptionChoosed';
import ButtonAction from './src/components/ButtonAction';
import SummaryResult from './src/components/SummaryResult';

const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const listOption = [
  {
    label: ROCK,
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
  },
  {
    label: PAPER,
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png',
  },
  {
    label: SCISSORS,
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png',
  },
];

export default function App() {
  const [resultGame, setResultGame] = useState({
    label: 'Choose an option!',
    color: 'black',
  });
  const [listPlayer, setListPlayer] = useState([
    {
      name: 'Player',
      optionIndex: null,
    },
    {
      name: 'Computer',
      optionIndex: null,
    },
  ]);

  const [summaryResultData, setSummaryResultData] = useState({
    numWon: 0,
    numLose: 0,
    numTied: 0,
  });

  function handleClickButton(item) {
    listPlayer[0].optionIndex = listOption.indexOf(item);
    // computer choose
    const index = Math.floor(Math.random() * listOption.length);
    listPlayer[1].optionIndex = index;
    //
    setListPlayer([...listPlayer]);
    setResultGame(getResultGame(item.label, listOption[index].label));
  }

  function getResultGame(optionPlayer, optionComputer) {
    if (optionPlayer === optionComputer) {
      setSummaryResultData((state) => {
        ++state.numTied;
        return {
          ...state,
        };
      });
      return { label: 'Tie game!', color: 'black' };
    }

    let isWin = true;
    if (optionPlayer === ROCK) {
      isWin = optionComputer === SCISSORS;
    }
    if (optionPlayer === PAPER) {
      isWin = optionComputer === ROCK;
    }
    if (optionPlayer === SCISSORS) {
      isWin = optionComputer === PAPER;
    }

    if (isWin) {
      setSummaryResultData((state) => {
        ++state.numWon;
        return {
          ...state,
        };
      });
      return { label: 'Victory!', color: 'green' };
    } else {
      setSummaryResultData((state) => {
        ++state.numLose;
        return {
          ...state,
        };
      });
      return { label: 'Defeat!', color: 'red' };
    }
  }

  function handleResetGame() {
    setResultGame({
      label: 'Choose an option!',
      color: 'black',
    });
    listPlayer[0].optionIndex = null;
    listPlayer[1].optionIndex = null;
    setListPlayer([...listPlayer]);
    setSummaryResultData({
      numWon: 0,
      numLose: 0,
      numTied: 0,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[{ color: resultGame.color }, styles.resultGameLabel]}>
            {resultGame.label}
          </Text>
          <View style={styles.gameContainer}>
            <OptionChoosed
              namePlayer={listPlayer[0].name}
              option={
                listPlayer[0].optionIndex !== null
                  ? listOption[listPlayer[0].optionIndex]
                  : {}
              }
            />
            <Text>vs</Text>
            <OptionChoosed
              namePlayer={listPlayer[1].name}
              option={
                listPlayer[1].optionIndex !== null
                  ? listOption[listPlayer[1].optionIndex]
                  : {}
              }
            />
          </View>
          <View style={styles.listButtonWrapper}>
            {listOption.map((item) => {
              return (
                <ButtonAction
                  key={item.label}
                  item={item}
                  onPress={handleClickButton}
                />
              );
            })}
          </View>
          <SummaryResult
            summaryResultData={summaryResultData}
            onResetGame={handleResetGame}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultGameLabel: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  gameContainer: {
    margin: 10,
    borderWidth: 2,
    shadowRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderColor: 'grey',
    shadowOpacity: 0.9,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    width: '100%',
    alignItems: 'center',
  },
});
