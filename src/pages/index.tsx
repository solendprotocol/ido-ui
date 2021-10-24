import 'antd/dist/antd.css'

import { Col, Drawer, Row } from 'antd'
import React, { useState } from 'react'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import AboutPanel from './solend/AboutPanel'
import ActionPanel from './solend/ActionPanel'
import { Button } from '../components/button'
import useDeviceMode from '../hooks/useDeviceMode'
import useWalletStore from '../stores/useWalletStore'
import usePool from '../hooks/usePool'

const Page: React.FC = () => {
  const pool = useWalletStore((s) => s.pools)[0]
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { xl, isMobile } = useDeviceMode()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-scaffold relative wrapper">
        {drawerVisible && isMobile && (
            <ActionPanel
              setDrawerVisible={setDrawerVisible}
            />
          )}
        <Row justify={xl ? "space-between" : "center"}>
          <Col xs={24} xl={12}>
            <AboutPanel setDrawerVisible={setDrawerVisible} />
          </Col>
          {!isMobile && <Col
            xs={24} xl={12}
            style={{
              background: xl ? `url(/images/bg/market_hero.dark.svg)` : undefined,
              marginBottom: -16,
              paddingBottom: xl ? 16 : 120,
            }}
          >
            <ActionPanel
              setDrawerVisible={setDrawerVisible}
            />
          </Col>
          }
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default Page
