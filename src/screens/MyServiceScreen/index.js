import { useState } from 'react'
import { AppSafeAreaView } from '@components/AppViews'
import GroupTab from '@components/GroupTab';

import BookedServices from './components/BookedServices';
import OpenServices from './components/OpenServices';
import SettledServices from './components/SettledServices';

export default MyServiceScreen = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = {
    0: <BookedServices />,
    1: <OpenServices />,
    2: <SettledServices />
  }

  return (
    <AppSafeAreaView>
      <GroupTab 
        tabs={["Booked", "Open", "Settled"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {tabs[activeTab]}
    </AppSafeAreaView>
  )
}