import { Image, StyleSheet, Platform, TouchableOpacity, Text, View } from 'react-native';

import { initializeApp } from 'firebase/app';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import firebase from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1zjwDB3tSigXRnSbHGH7Nf8AwxOzTVLY',
  projectId: 'healthdevice-89a7e',
  messagingSenderId: '708390894238',
};

const app = initializeApp(firebaseConfig); // Correct usage
const db = getFirestore(app);

async function getData() {
  const usersCol = collection(db, 'Users');
  const usersSnap = await getDocs(usersCol);
  
  // Map over the snapshot and return an array of document data
  const data = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
}

async function saveData() {
  const usersCol = collection(db, 'Users');

  // Define the data to be saved
  const newUserData = {
    username: "testuser",
    email: "testuser@example.com",
    password: "test",
    createdAt: new Date()
  };

  try {
    // Add a new document with auto-generated ID
    const docRef = await addDoc(usersCol, newUserData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Export the Firebase instances
 // Realtime Database

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText} type="title">Welcome to the Health Device App!</ThemedText>
        {/* <HelloWave /> */}
      </View>
      <View style={styles.firstChildContainer}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={async() => 
          console.log(await getData())} style={styles.normalButton}>
          <Text style={styles.buttonText}>Log Test Database</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async() => 
            await saveData()} style={styles.normalButton}>
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
    width: "30%",
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
});
