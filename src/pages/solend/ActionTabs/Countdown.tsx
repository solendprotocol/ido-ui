import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'

import BigCountdown from '../../../components/ido/BigCountdown'
import { IDO_STARTS } from '../../../config/constants'
import usePool from '../../../hooks/usePool'
import { useRefresh } from '../../../hooks/useRefresh'
import useWalletStore from '../../../stores/useWalletStore'

const Countdown: React.FC = () => {
  const { doForceRefresh } = useRefresh()
  const pool = useWalletStore((s) => s.pools)[0]
  const { startIdo } = usePool(pool)

  return (
    <Row gutter={[0, 24]} justify="center" align="middle" className="side">
      <Col span={24} className="imageHolder">
        <img src="/images/about_hero.png" width={360} />
      </Col>
      <Col>
        <BigCountdown
          date={startIdo ?? IDO_STARTS}
          onComplete={doForceRefresh}
        />
      </Col>
    </Row>
  )
}

export default Countdown
