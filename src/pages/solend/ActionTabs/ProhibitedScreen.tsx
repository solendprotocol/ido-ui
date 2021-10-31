import { Col, Row } from 'antd'
import React from 'react'

import Button from '../../../components/button/Button'
import Typography from '../../../components/typography/Typography'
import { DISALLOWED_COUNTRIES, useCountry } from '../../../hooks/useCountry'

const Countdown: React.FC<{
  setAcceptedDisclaimer: (arg: boolean) => void
}> = ({ setAcceptedDisclaimer }) => {
  const countryCode = useCountry()

  const blockedIDO = DISALLOWED_COUNTRIES.includes(countryCode ?? '')

  const body = blockedIDO ? (
    <Typography level="caption">
      <Typography level="headline">
        Sorry, you are not able to participate from your country.
      </Typography>
      <br />
      The Solend IDO is not available in Afghanistan, Ivory Coast, Cuba, Iraq,
      Iran, Liberia, North Korea, Syria, Sudan, South Sudan, Zimbabwe, Antigua,
      United States, American Samoa, Guam, Northern Mariana Islands, Puerto
      Rico, United States Minor Outlying Islands, US Virgin Islands, Ukraine,
      Belarus,, Albania, Burma, Central African Republic, Democratic Republic of
      Congo, Lybia, Somalia, Yemen, United Kingdom, Thailand.
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
      <a target="_blank" href="https://discord.gg/aGXvPNGXDT" rel="noreferrer">
        <u>Discord</u>
      </a>
      .
    </Typography>
  ) : (
    <Typography level="caption">
      <Typography level="headline">
        The Solend IDO can only be accessed from select countries.
      </Typography>
      By clicking acknowledge below, I certify that I am not a resident of
      Afghanistan, Ivory Coast, Cuba, Iraq, Iran, Liberia, North Korea, Syria,
      Sudan, South Sudan, Zimbabwe, Antigua, United States, American Samoa,
      Guam, Northern Mariana Islands, Puerto Rico, United States Minor Outlying
      Islands, US Virgin Islands, Ukraine, Belarus,, Albania, Burma, Central
      African Republic, Democratic Republic of Congo, Lybia, Somalia, Yemen,
      United Kingdom, Thailand.
      <br />
      <br />
      If you have any questions, please contact us via{' '}
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
      <a target="_blank" href="https://discord.gg/aGXvPNGXDT" rel="noreferrer">
        <u>Discord</u>
      </a>
      .
      {!blockedIDO && (
        <Button onClick={() => setAcceptedDisclaimer(true)}>Acknowledge</Button>
      )}
    </Typography>
  )

  return (
    <Row gutter={[0, 48]} justify="center" align="middle" className="side">
      <Col span={24} className="imageHolder">
        <img src="/images/about_hero.png" width={360} />
      </Col>
      <Col span={24} className="text-center">
        {body}
      </Col>
    </Row>
  )
}

export default Countdown
