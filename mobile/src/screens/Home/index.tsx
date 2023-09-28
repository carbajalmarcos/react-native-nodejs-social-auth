import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSignOut,
  faPingPongPaddleBall,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import {ping} from '../../api/authService';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {setAccessToken} from '../../utils/utils';
import Loading from '../../../components/Loading';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'auth'>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await setAccessToken();
      navigation.navigate('auth');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'LOGOUT ERROR',
      });
    }
  };

  const handlePing = async () => {
    try {
      console.log('initializing ping');
      const pong = await ping();
      Toast.show({
        type: 'success',
        text1: pong.toUpperCase(),
        position: 'bottom',
      });
      console.log(pong);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesomeIcon icon={faCheckCircle} size={60} color="green" />
      <Text style={styles.welcomeText}>YOU ARE LOGGED IN</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePing}
          style={{...styles.button, backgroundColor: '#3d94e7'}}>
          <FontAwesomeIcon
            icon={faPingPongPaddleBall}
            size={20}
            color="white"
          />
          <Text style={styles.buttonText}>PING</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <FontAwesomeIcon icon={faSignOut} size={20} color="white" />
          <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
      <Loading loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  welcomeText: {
    fontSize: 24,
    color: 'green',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
  },
  buttonContainer: {
    display: 'flex',
    gap: 20,
    flexShrink: 1,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
