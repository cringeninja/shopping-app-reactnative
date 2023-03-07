import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('John Paul Alfonso');
  const [email, setEmail] = useState('johnpaulalfonso@gmail.com');
  const [phone, setPhone] = useState('09958812278');
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('accessToken');
      const user = await AsyncStorage.getItem('userInfo');
      if (token) {
        setAccessToken(token);
      }
      if (user) {
        setUserInfo(JSON.parse(user));
      }
    })();
  }, []);

  useEffect(() => {
    if (accessToken) {
      AsyncStorage.setItem('accessToken', accessToken);
    }
    if (userInfo) {
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [accessToken, userInfo]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "682366870829-7rofkcqjcejlnsg2ou9vn5gudur6qrsr.apps.googleusercontent.com",
    iosClientId: "682366870829-jnqfrvrho87fr8tcclu13stmmbtvmh9l.apps.googleusercontent.com",
    expoClientId: "682366870829-3d1i6ohe8o710effs80rc8vsk1r138p9.apps.googleusercontent.com"

  });

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  async function handleGoogleSignIn() {
    const result = await promptAsync();
    if (result.type === 'success') {
      setAccessToken(result.params.access_token);
    }
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          {userInfo.picture && (
            <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          )}
          <Text style={[styles.userInfoText, { color: 'white' }]}>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
          <Text style={[styles.userInfoText, { color: 'white' }]}>{`Name: ${userInfo.name}`}</Text>
          <Text style={[styles.userInfoText, { color: 'white' }]}>{`Email: ${userInfo.email}`}</Text>
          <Text style={[styles.userInfoText, { color: 'white' }]}>{`ID: ${userInfo.id}`}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopper's Profile</Text>
      <View style={[styles.inputContainer, { marginHorizontal: 20 }]}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={[styles.inputContainer, { marginHorizontal: 20 }]}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>
      <View style={[styles.inputContainer, { marginHorizontal: 20 }]}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      </View>
      <View style={[styles.inputContainer, { marginHorizontal: 20 }]}>
        <Button
          title={accessToken ? "Get User Data" : "Login with Google"}
          onPress={accessToken ? getUserData : handleGoogleSignIn}
        />
        <StatusBar style="auto" />
      </View>
      {showUserInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child: {
    flex: 1,
    backgroundColor: 'black',
    margin: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a0dad',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  googleButton: {
    width: 192,
    height:48,
    marginTop: 20,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
