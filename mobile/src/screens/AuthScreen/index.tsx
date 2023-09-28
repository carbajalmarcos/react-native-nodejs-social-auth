import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  faGoogle,
  faFacebookF,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPingPongPaddleBall,
  faTableTennisPaddleBall,
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RootStackParamList} from '../../types';
import {CLIENTS} from '../../constants';
import {
  buildUrlLogin,
  getUserDataFromUrl,
  setAccessToken,
} from '../../utils/utils';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {ping} from '../../api/authService';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'home'>;
}
const AuthScreen: React.FC<Props> = ({navigation}) => {
  const [uri, setURL] = useState('');

  const handleOpenURL = async (url: any) => {
    try {
      const token = getUserDataFromUrl(url);
      if (token) {
        await setAccessToken(token);
        navigation.navigate('home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Auth error',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.toString(),
      });
    }
  };

  //based on the platform will use either SafariView or Linking
  const openUrl = (url: string) => {
    setURL(url);
  };

  // Use useFocusEffect to reset the screen
  useFocusEffect(
    React.useCallback(() => {
      setURL('');
    }, []),
  );

  // Setting up Linking
  useEffect(() => {
    Linking.addEventListener('url', url => handleOpenURL(url.url));
    Linking.getInitialURL().then((url: any) => {
      if (url) {
        handleOpenURL({url});
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const handleAuth = (client: string) => {
    openUrl(buildUrlLogin(client));
  };

  const handlePing = async () => {
    try {
      const pong = await ping();
      Toast.show({
        type: 'success',
        text1: pong.toUpperCase(),
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `${error ?? 'error'}`,
        position: 'bottom',
      });
    }
  };

  return (
    <>
      {uri !== '' ? (
        <SafeAreaView style={{flex: 1}}>
          <WebView
            userAgent={
              Platform.OS === 'android'
                ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
                : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
            }
            source={{uri}}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.title}>Authenticaton</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => handleAuth(CLIENTS.google)}
              style={styles.button}>
              <FontAwesomeIcon icon={faGoogle} size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAuth(CLIENTS.facebook)}
              style={styles.button}>
              <FontAwesomeIcon icon={faFacebookF} size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAuth(CLIENTS.twitter)}
              style={styles.button}>
              <FontAwesomeIcon icon={faTwitter} size={24} color="skyblue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAuth(CLIENTS.github)}
              style={styles.button}>
              <FontAwesomeIcon icon={faGithub} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handlePing}
            style={{
              ...styles.button,
              padding: 5,
              width: '100%',
            }}>
            <FontAwesomeIcon
              icon={faTableTennisPaddleBall}
              size={24}
              color="green"
            />
            <Text style={styles.buttonText}>PING</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 80,
  },
  button: {
    dispplay: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    display: 'flex',
    gap: 20,
    flexShrink: 1,
  },
  buttonText: {
    color: 'black',
    marginLeft: 5,
  },
});

export default AuthScreen;
