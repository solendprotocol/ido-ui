import { Col, Row } from 'antd'
import moment from 'moment'
import React from 'react'

import BigCountdown from '../../../components/ido/BigCountdown'
import { useRefresh } from '../../../hooks/useRefresh'

const Countdown: React.FC = () => {
  const { doForceRefresh } = useRefresh()

  return (
    <Row gutter={[0, 24]} justify="center" align="middle" className="side">
      <Col span={24} className="imageHolder">
        <img src="/images/about_hero.png" width={360} />
      </Col>
      <Col>
        <BigCountdown
          date={moment().add(1, 'day')}
          onComplete={doForceRefresh}
        />
      </Col>
    </Row>
  )
}

export default Countdown
