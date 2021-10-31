import 'antd/dist/antd.css'

import { Col, Row } from 'antd'
import React, { useState } from 'react'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import useDeviceMode from '../hooks/useDeviceMode'
import AboutPanel from './solend/AboutPanel'
import ActionPanel from './solend/ActionPanel'

const Page: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { xl, isMobile } = useDeviceMode()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-scaffold relative wrapper">
        {drawerVisible && isMobile && (
          <ActionPanel setDrawerVisible={setDrawerVisible} />
        )}
        <Row justify={!xl ? 'center' : 'space-between'}>
          <Col xs={24} xl={12}>
            <AboutPanel setDrawerVisible={setDrawerVisible} />
          </Col>
          {!isMobile && (
            <Col
              xs={24}
              xl={12}
              className="blurBg"
              style={{
                background: `url(/images/bg/market_hero.dark.svg)`,
              }}
            >
              <ActionPanel setDrawerVisible={setDrawerVisible} />
            </Col>
          )}
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default Page
