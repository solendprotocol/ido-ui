import { Col, Divider, Row, Space } from 'antd'
import React from 'react'

import Typography from '../typography/Typography'

export const Footer: React.FC = () => {
  return (
    <footer
      className="bg-scaffold px-6 text-center py-4 border-default border"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Row
        className="customFooter"
        gutter={16}
        align="middle"
        justify="space-between"
      >
        <Col>
          <Typography level="caption" color="secondary">
            Solend
          </Typography>
        </Col>
        <Col>
          <Space>
            <a target="_blank" href="https://solend.fi" rel="noreferrer">
              <Typography level="caption" color="secondary">
                App
              </Typography>
            </a>
            <a
              target="_blank"
              href="https://github.com/solendprotocol"
              rel="noreferrer"
            >
              <Typography level="caption" color="secondary">
                Github
              </Typography>
            </a>
            <a
              target="_blank"
              href="https://twitter.com/solendprotocol"
              rel="noreferrer"
            >
              <Typography level="caption" color="secondary">
                Twitter
              </Typography>
            </a>
            <a
              target="_blank"
              href="https://discord.gg/aGXvPNGXDT"
              rel="noreferrer"
            >
              <Typography level="caption" color="secondary">
                Discord
              </Typography>
            </a>
            <a
              target="_blank"
              href="https://medium.com/solend"
              rel="noreferrer"
            >
              <Typography level="caption" color="secondary">
                Blog
              </Typography>
            </a>
          </Space>
        </Col>
      </Row>
    </footer>
  )
}
