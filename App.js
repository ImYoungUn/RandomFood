/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {  useState,  useEffect } from 'react';
import { Text,  TouchableOpacity, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation'


const App: () => React$Node = () => {
  const [placeName, setPlaceName] = useState([])
  const [location, setLocation] = useState({
    x:'',
    y:'',
  })
  useEffect(() => {
    getCurretLocation()
    return () => {
    }
  }, [location])

  function getCurretLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          x: JSON.stringify(position.coords.longitude),
          y: JSON.stringify(position.coords.latitude)
        })
      },
      (error) => {alert(error.message)}
    )
  }

  function Search() {
    const API_KEY = "515f6e27ead58c32aebc7332b3c92345";
    const requestParam = {
      code: 'FD6',
      x: location.x,
      y: location.y,
      radius: '300'
    }
  
    fetch(`https://dapi.kakao.com/v2/local/search/category?category_group_code=${requestParam.code}&x=${requestParam.x}&y=${requestParam.y}&radius=${requestParam.radius}`, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`
        },
      })
      .then(response => response.json())
      .then(json => {
        const count = json.documents.length
        setPlaceName(prev => [...prev, requestParam.radius+'m 이내 '+count+'개의 음식점 중 3군데 입니다. (중복 가능 ver)'])
          setPlaceName(prev => [...prev, json.documents[Math.floor(Math.random() * (count - 1))].place_name])
          setPlaceName(prev => [...prev, json.documents[Math.floor(Math.random() * (count - 1))].place_name])
          setPlaceName(prev => [...prev, json.documents[Math.floor(Math.random() * (count - 1))].place_name])
      })
  }

  function ShowPlaceName() {
    return (
      placeName.map((text, index) => <Text key={index}>{text}</Text>)
    )
  }

  return ( 
  <>
    <TouchableOpacity onPress = {Search} style = {styles.sectionContainer}>
      <Text style = {{color: 'black'}}> 주변 음식 3개 고르기 </Text> 
    </TouchableOpacity> 
    <ShowPlaceName/>
  </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
export default App;