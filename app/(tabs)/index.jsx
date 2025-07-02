import Loader from "@/components/Loader";
import { useGlobalContext } from '@/constants/context/GlobalContext';
import { fetchMetroData } from "@/services/api";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Index = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [stationData, setstationData] = useState([]);
  const { setTitle, setBgColor, setMetroId } = useGlobalContext();


  useEffect(() => {
    const GetStationData = async () => {
      setisLoading(true)
      const response = await fetchMetroData()
      setstationData(response)
      setisLoading(false)
    }
    GetStationData()
  }, [])


  const handleInvalidate = async () => {
    setRefreshing(true)
    const response = await fetchMetroData()
    setstationData(response)
    setRefreshing(false)
  };

  useFocusEffect(
    useCallback(() => {
      setTitle("All Station");
      setBgColor("#00A693");
      setMetroId(null);
    }, [])
  );





  return (
    <View style={styles.container}>
      {/* Static content always visible */}
      <View >
        <Text style={styles.heading}>Search Metro Route in India</Text>
        <Text style={styles.subheading}>
          Select from all the active metro networks given, and find a route map and fare info.
        </Text>
      </View>
      <ScrollView style={{ marginTop: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleInvalidate} />
        }

      >
        {stationData && stationData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: "#fff",
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              height: 40,
            }}

            onPress={() => {
              setTitle(item.Name);
              setBgColor(item.Theme);
              setMetroId(item.Metro_ID);
              router.push({
                pathname: "/(metro-info)",
                params: {
                  name: item.Name,
                  id: item.Metro_ID,
                  bgColor: item.Theme,
                }
              });
            }}


          >
            <Text style={styles.itemText}>{item.Name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Loader as overlay */}
      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00A693",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  subheading: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  itemText: {
    color: "#00A693",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
});

export default Index;