import {Row, Col} from 'antd'
import React, { useState } from 'react'

import AboutPanel from './solend/AboutPanel'
import ActionPanel from './solend/ActionPanel'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

import 'antd/dist/antd.css';

const Page: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
  <div className="min-h-screen bg-scaffold relative">
      <Header />
        <Row justify="center">
          <Col flex="720px">
            <AboutPanel
              setDrawerVisible={setDrawerVisible}           
            />
          </Col>
          <Col flex="720px"
              style={{
                background: `url(/images/bg/market_hero.dark.svg)`,
              }}>
            <ActionPanel
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}           
            />
          </Col>
        </Row>
      <Footer />
    </div>
  )
}

export default Page
