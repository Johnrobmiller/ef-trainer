import styles from '../styles/WCST.module.css'

import React from 'react'
import { RecoilRoot } from 'recoil'

import Game from '../components/WCST/Game'
import Banner from '../components/WCST/Banner'
import Footer from '../components/WCST/Footer'

export default function App() {

  return (
    <div className={`${styles.app} h-screen flex flex-col justify-between`}>

      <Banner />        

      <RecoilRoot>
        <Game />                  
      </RecoilRoot>
      
      <Footer />

    </div>
  )
}