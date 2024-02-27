import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const players = [
  { id: 1, name: "Dhoni" },
  { id: 2, name: "Ruturaj" },
  { id: 3, name: "Ajinkya" },
  { id: 4, name: "Ishan" },
  { id: 5, name: "Shreyas" },
  { id: 6, name: "Virat" },
  { id: 7, name: "Dhawan" },
  { id: 8, name: "Surya" },
];

export default function FixturesScreen() {
  const [matches, setMatches] = useState([]);
  const [roundWinners, setRoundWinners] = useState([]);

  useEffect(() => {
    createInitialRound();
  }, []);

  const createInitialRound = () => {
    let shuffledPlayers = players.sort(() => Math.random() - 0.5);
    // If there's an odd number of players, give the last player a bye
    if (shuffledPlayers.length % 2 !== 0) {
      const byePlayer = shuffledPlayers.pop();
      setRoundWinners([byePlayer]);
    }
    const initialMatches = [];
    for (let i = 0; i < shuffledPlayers.length / 2; i++) {
      initialMatches.push({
        matchNumber: i + 1,
        player1: shuffledPlayers[i * 2],
        player2: shuffledPlayers[i * 2 + 1],
        winner: null,
        started: false,
        score1: "",
        score2: "",
        submitEnabled: false,
      });
    }
    setMatches([initialMatches]);
  };

  const createNextRound = (currentRoundIndex) => {
    const currentRoundMatches = matches[currentRoundIndex];
    const winners = currentRoundMatches.map((match) => match.winner);
    const nextRoundMatches = [];
    for (let i = 0; i < winners.length / 2; i++) {
      nextRoundMatches.push({
        matchNumber: i + 1,
        player1: winners[i * 2],
        player2: winners[i * 2 + 1],
        winner: null,
        started: false,
        score1: "",
        score2: "",
        submitEnabled: false, // Add a new property for each match to track submit button status
      });
    }
    setMatches([...matches, nextRoundMatches]);
  };

  const startMatch = (roundIndex, matchIndex) => {
    const updatedMatches = [...matches];
    updatedMatches[roundIndex][matchIndex].started = true;
    updatedMatches[roundIndex][matchIndex].submitEnabled = true; // Enable submit button when match starts
    setMatches(updatedMatches);
  };

  const submitScore = (roundIndex, matchIndex) => {
    const currentMatch = matches[roundIndex][matchIndex];
    // Check if scores are entered for both players
    if (currentMatch.score1 === "" || currentMatch.score2 === "") {
      Alert.alert("Warning", "Please enter scores for both players.");
      return;
    }
    const winner =
      parseInt(currentMatch.score1) > parseInt(currentMatch.score2)
        ? currentMatch.player1
        : currentMatch.player2;
    const updatedMatches = [...matches];
    updatedMatches[roundIndex][matchIndex] = {
      ...currentMatch,
      winner: winner,
      submitEnabled: false, // Disable submit button after submitting scores
    };
    setMatches(updatedMatches);
    setRoundWinners([...roundWinners, winner]);

    // Check if there are only two players left
    if (updatedMatches[roundIndex].length === 1) {
      // Declare the winner
      Alert.alert(
        "Tournament Winner",
        `The winner of the tournament is ${winner.name}`
      );
    } else {
      // Check if all matches in the current round are completed
      const allMatchesCompleted = updatedMatches[roundIndex].every(
        (match) => match.winner !== null
      );
      if (allMatchesCompleted) {
        createNextRound(roundIndex);
      }
    }
  };

  const renderMatches = (roundIndex) => {
    const currentRoundMatches = matches[roundIndex];
    return currentRoundMatches.map((match, matchIndex) => (
      <View key={matchIndex} style={styles.matchContainer}>
        <Text>
          Match {match.matchNumber} (Round {roundIndex + 1})
        </Text>
        <View style={styles.dropdownContainer}>
          <Picker
            style={styles.dropdown}
            selectedValue={match.player1}
            onValueChange={(itemValue) =>
              handlePlayerSelect(roundIndex, matchIndex, itemValue, "player1")
            }
            enabled={!match.started}
          >
            <Picker.Item label="Select Player" value={null} />
            {players.map((player) => (
              <Picker.Item key={player.id} label={player.name} value={player} />
            ))}
          </Picker>
          <Picker
            style={styles.dropdown}
            selectedValue={match.player2}
            onValueChange={(itemValue) =>
              handlePlayerSelect(roundIndex, matchIndex, itemValue, "player2")
            }
            enabled={!match.started}
          >
            <Picker.Item label="Select Player" value={null} />
            {players.map((player) => (
              <Picker.Item key={player.id} label={player.name} value={player} />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => startMatch(roundIndex, matchIndex)}
            style={[
              styles.button,
              { backgroundColor: match.started ? "#DDDDDD" : "#6495ED" },
            ]}
            disabled={match.started}
          >
            <Text>Start Match</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submitScore(roundIndex, matchIndex)}
            style={[
              styles.button,
              { backgroundColor: match.submitEnabled ? "#6495ED" : "#DDDDDD" },
            ]}
            disabled={!match.submitEnabled}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        {match.winner && <Text>Winner: {match.winner.name}</Text>}
        {match.started && (
          <View style={styles.scoreContainer}>
            <TextInput
              style={styles.scoreInput}
              placeholder="Score Player 1"
              keyboardType="numeric"
              value={match.score1}
              onChangeText={(text) =>
                handleScoreChange(roundIndex, matchIndex, text, "score1")
              }
              editable={!match.winner}
            />
            <TextInput
              style={styles.scoreInput}
              placeholder="Score Player 2"
              keyboardType="numeric"
              value={match.score2}
              onChangeText={(text) =>
                handleScoreChange(roundIndex, matchIndex, text, "score2")
              }
              editable={!match.winner}
            />
          </View>
        )}
      </View>
    ));
  };

  const handlePlayerSelect = (roundIndex, matchIndex, player, playerType) => {
    const updatedMatches = [...matches];
    const currentMatch = updatedMatches[roundIndex][matchIndex];

    // Find the index of the match where the player is already assigned
    const existingMatchIndex = updatedMatches[roundIndex].findIndex(
      (match, index) =>
        index !== matchIndex && // Ensure not to check the current match
        (match.player1?.id === player.id || match.player2?.id === player.id)
    );

    if (existingMatchIndex !== -1) {
      // If the player is already assigned to another match, swap the players between the matches
      const existingMatch = updatedMatches[roundIndex][existingMatchIndex];
      const otherPlayerType = playerType === "player1" ? "player2" : "player1";

      // Swap the players between the matches
      const tempPlayer = currentMatch[playerType];
      currentMatch[playerType] = existingMatch[otherPlayerType];
      existingMatch[otherPlayerType] = tempPlayer;
    } else {
      // Swap the players within the current match
      if (playerType === "player1") {
        currentMatch.player1 = player;
      } else {
        currentMatch.player2 = player;
      }
    }

    setMatches(updatedMatches);
  };

  const handleScoreChange = (roundIndex, matchIndex, score, scoreType) => {
    const updatedMatches = [...matches];
    updatedMatches[roundIndex][matchIndex][scoreType] = score;
    setMatches(updatedMatches);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fixtures Screen</Text>
      <ScrollView>
        {matches.map((roundMatches, index) => (
          <View key={index}>
            <Text style={styles.roundHeader}>Round {index + 1}</Text>
            {renderMatches(index)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  roundHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  matchContainer: {
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dropdown: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#6495ED",
    padding: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  scoreInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    marginRight: 5,
  },
});
