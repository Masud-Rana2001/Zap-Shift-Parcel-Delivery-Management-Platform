import React from 'react'
import Banner from './Banner'

import HowItWork from './HowItWork'
import OurServices from './OurServices'
import Companies from './Companies'
import Features from './Features'
import CourierCommitmentBlock from './CourierCommitmentBlock'
import CustomerReview from './CustomerReview'
import Faq from './Faq'

function HomePage() {
  return (
    <div className="my-10">
      <Banner />
      <HowItWork />
      <OurServices />
      <Companies />
      <Features />
      <CourierCommitmentBlock />
      <CustomerReview />
      <Faq/>
    </div>
  )
}

export default HomePage