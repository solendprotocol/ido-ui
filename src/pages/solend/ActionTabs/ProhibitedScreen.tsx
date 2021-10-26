import { Col, Row } from 'antd'
import React from 'react'

import Typography from '../../../components/typography/Typography'

const Countdown: React.FC = () => {
  return (
    <Row gutter={[0, 48]} justify="center" align="middle" className="side">
      <Col span={24} className="imageHolder">
        <img src="/images/about_hero.png" width={360} />
      </Col>
      <Col span={24} className="text-center">
        <Typography>
          <Typography level="headline">
            Sorry, you are not able to participate in the Solend IDO from your
            country.
          </Typography>
          <br />
          If you think your access is restricted by mistake or have another
          question, please contact us via{' '}
          <a href="mailto:team@solend.fi">
            <u>Email</u>
          </a>
          ,{' '}
          <a
            target="_blank"
            href="https://twitter.com/solendprotocol"
            rel="noreferrer"
          >
            <u>Twitter</u>
          </a>
          , or{' '}
          <a
            target="_blank"
            href="https://discord.gg/aGXvPNGXDT"
            rel="noreferrer"
          >
            <u>Discord</u>
          </a>
          .
        </Typography>
      </Col>
    </Row>
  )
}

export default Countdown
