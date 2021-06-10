import React, { useState } from 'react'

import axios from 'axios'
import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Caption, Subheading } from 'react-native-paper'
import { urlShortener } from '../helpers/urlShortener'
import { timePassedCounter } from '../helpers/timePassedCounter'

export type StoryType = {
  by: string
  descendands: number
  id: number
  score: number
  time: number
  title: string
  type: string
  url?: string
}

type AuthorData = {
  about?: string
  created: number
  id: string
  karma: string
  submitted: Array<number>
}

export const Story = ({ by, score, time, title, url }: StoryType) => {
  const [authorData, setAuthorData] = useState<AuthorData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    setIsLoading(true)
    const fetchAuthorDetails = async () => {
      const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${by}.json`)

      setIsLoading(false)
      setAuthorData(data)
    }

    fetchAuthorDetails()
    return () => {
      setIsLoading(false)
    }
  }, [])
  return (
    <View style={styles.wrapper}>
      <View style={styles.storyHeader}>
        <Subheading>{title}</Subheading>
        <Caption>{url && urlShortener(url).length > 2 && urlShortener(url)}</Caption>
      </View>
      <View>
        <Caption>
          <Caption style={styles.score}>{score}</Caption> points by {by}{' '}
          {isLoading ? (
            <ActivityIndicator size='small' color='disabled' />
          ) : (
            <Caption>({authorData?.karma ? authorData.karma + ' karma' : 'no karma'})</Caption>
          )}
          , posted {timePassedCounter(time)}.
        </Caption>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 5,
  },
  storyHeader: {
    flexDirection: 'row',
  },
  score: {
    fontWeight: 'bold',
  },
})
