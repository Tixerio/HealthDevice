import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, Text, View } from 'react-native';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB1zjwDB3tSigXRnSbHGH7Nf8AwxOzTVLY',
  projectId: 'healthdevice-89a7e',
  messagingSenderId: '708390894238',
};

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Check if auth has already been initialized

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Function to store data in AsyncStorage
const storeData = async (value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await ReactNativeAsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    console.error("Error saving data: ", e);
  }
};

// Function to retrieve data from Firestore
const getData = async () => {
  try {
    const usersCol = collection(db, 'Users');
    const usersSnap = await getDocs(usersCol);
    return usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

// Function to save data to Firestore
const saveData = async () => {
  const usersCol = collection(db, 'Users');
  const newUserData = {
    username: "testuser",
    email: "testuser@example.com",
    password: "test",
    createdAt: new Date()
  };
  try {
    const docRef = await addDoc(usersCol, newUserData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Main Component
export default function HomeScreen() {
  useEffect(() => {
    const storeAuthData = async () => {
      await storeData(auth.currentUser);
    };
    storeAuthData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText} type="title">Welcome to the Health Device App!</ThemedText>
      </View>
      <View style={styles.firstChildContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={async() => console.log(await getData())} style={styles.normalButton}>
            <Text style={styles.buttonText}>Log Test Database</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async() => await saveData()} style={styles.normalButton}>
            <Text style={styles.buttonText}>Save into Database</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFECB"
  },
  titleContainer: {
    marginTop: 100,
    marginHorizontal: 20
  },
  firstChildContainer: {
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "#37AFE1",
  },
  normalButton: {
    width: "80%",
    maxWidth: 200,
    height: 60,
    backgroundColor: "#4CC9FE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
})
