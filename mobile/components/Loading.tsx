import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading : React.FC<{loading: boolean}> = ({loading}) => {

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large"/>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading