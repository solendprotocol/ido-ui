import { Col, Row, Tooltip } from 'antd'
import React, { ReactElement } from 'react'

import Typography from '../typography/Typography'

type RowMetricPropType = {
  label: React.ReactNode
  value: React.ReactNode
  tooltip?: React.ReactNode
  className?: string
}

RowMetric.defaultProps = {
  tooltip: null,
}

function RowMetric({
  label,
  value,
  tooltip,
  className,
  ...props
}: RowMetricPropType): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Col span={24} className={className} {...props}>
      <Row justify="space-between">
        <Col>
          <Typography level="caption" color="secondary">
            {label}
            <span> </span>
            {tooltip && (
              <Tooltip title={tooltip}>
                <img
                  src="/icons/info.svg"
                  className="inline-block"
                  alt="info"
                />
              </Tooltip>
            )}
          </Typography>
        </Col>
        <Col>
          <Typography>{value}</Typography>
        </Col>
      </Row>
    </Col>
  )
}

export default RowMetric
