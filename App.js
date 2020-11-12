
import React , {useState, useEffect} from 'react';
import { RefreshControl, StyleSheet, Text, View, SafeAreaView, FlatList,ActivityIndicator, Linking, Image, TouchableOpacity} from 'react-native';


const URL = 'http://newsapi.org/v2/top-headlines?' +
'country=us&' +
'apiKey=d3617fc0504c41d0a430bebf6ba1ca63';

export default function App(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title,setTitle] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

useEffect(()=>{
  getData();
},[]);

const getData = () =>{ 
    fetch(URL).then((response) => response.json())
    .then((json) => {setRefreshing(false);setData(json.articles); setTitle(json.title);})
    .catch((error) => alert(error))
    .finally(() => setLoading(false));
  };
  const onRefresh = () => {
    setData([]);
    getData();
  };


  return (
    <SafeAreaView style={{paddingTop:50,paddingLeft:10, backgroundColor: '#c9f5f5',}}>
      
      {isLoading ? <ActivityIndicator size='large' color='black' style={{paddingTop:100z}}/>:
        <View> 
        <FlatList 
        data = {data}
        keyExtractor={({id},index) => id}
        renderItem={({item}) => {
          return(
          <View style = {{flexDirection: 'row',}}> 
            <View style={{width: 50, height: 50, marginRight:10, }} >
              <TouchableOpacity onPress = {() => Linking.openURL(item.url)}>
                <Image  style={{width: 50, height: 50,}}  source={{uri: (item.urlToImage)}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{marginRight:10,width:340, marginBottom:40}}>
              <Text key={0} style={{}}  >{item.title}</Text>
              <Text key={1} style={{color:'blue'}} onPress = {() => Linking.openURL(item.url)}>URL:  {item.url} {"\n"}</Text>
            </View>
          </View>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        />
      </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


