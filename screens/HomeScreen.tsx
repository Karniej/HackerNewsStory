import React, { useEffect } from 'react'
import { ActivityIndicator, Divider, Title } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import axios from 'axios'
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from '../store/actions'
import { RootStore } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { Story, StoryType } from '../components/Story'
import styles from './styles'
import { getRandomList } from '../helpers/getRandomList'
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomeScreen = () => {
  const storeData = useSelector((state: RootStore) => state.data)
  const { isLoading } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const fetchData = async () => {
    dispatch(fetchDataRequest())

    const { data }: { data: Array<string> } = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    )
    const randomizedData = getRandomList(data, 10)

    try {
      const requests = randomizedData.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )

      const stories = await axios.all(requests)
      const filteredStories = stories.map((story) => story.data).sort((a, b) => a.score - b.score)

      return dispatch(fetchDataSuccess(filteredStories))
    } catch (error) {
      dispatch(fetchDataFailure(error))
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Random HackerNews Stories</Title>
      {isLoading ? (
        <ActivityIndicator size='large' color='#FF6600' />
      ) : (
        <FlatList
          data={storeData}
          style={styles.list}
          extraData={storeData}
          ListFooterComponent={<View style={styles.listFooter} />}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: StoryType }) => {
            return <Story {...item} />
          }}
        />
      )}
    </SafeAreaView>
  )
}
