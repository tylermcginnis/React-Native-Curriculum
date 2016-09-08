import React, { PropTypes } from 'react'
import { TabBarIOS, Text } from 'react-native'
import { colors } from '~/styles'
import IoniconIcon from 'react-native-vector-icons/Ionicons'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,
}

export default function FooterTabs ({activeFooterTab, onTabSelect, navigator, authedId}) {
  return (
    <TabBarIOS tintColor={colors.active}>
      <IoniconIcon.TabBarItem
        iconSize={35}
        iconName='ios-home-outline'
        title='Home'
        selected={activeFooterTab === 'home'}
        onPress={() => onTabSelect('home')}>
          <Text>Home</Text>
      </IoniconIcon.TabBarItem>
      <IoniconIcon.TabBarItem
        iconSize={35}
        iconName='ios-trophy-outline'
        title='Your Posts'
        selected={activeFooterTab === 'yourPosts'}
        onPress={() => onTabSelect('yourPosts')}>
          <Text>Your Posts</Text>
      </IoniconIcon.TabBarItem>
    </TabBarIOS>
  )
}