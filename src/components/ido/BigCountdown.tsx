import classNames from 'classnames'
import moment from 'moment'
import Countdown from 'react-countdown'

import useDeviceMode from '../../hooks/useDeviceMode'
import Typography from '../typography/Typography'

interface CountdownBlockProps {
  count: string
  label: string
}

const CountdownBlock: React.FC<CountdownBlockProps> = ({ count, label }) => {
  const { isMobile } = useDeviceMode()
  return (
    <>
      <div className="bg-scaffold flex flex-col items-center w-14 sm:w-100 pt-4 overflow-hidden">
        <Typography level={isMobile ? undefined : 'display'}>
          {count}
        </Typography>
        <Typography level={isMobile ? undefined : 'title'}>{label}</Typography>
      </div>
    </>
  )
}

interface BigCountdownProps {
  date: moment.Moment
  className?: string
  onComplete: () => void
}

const BigCountdown: React.FC<BigCountdownProps> = ({
  className,
  date,
  onComplete,
}) => {
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div />
    } else {
      return (
        <div
          className={classNames(
            className,
            'flex items-center justify-center mt-6 mb-10 sm:mb-16'
          )}
        >
          <CountdownBlock count={days} label="Days" />
          <CountdownBlock count={hours} label="Hours" />
          <CountdownBlock count={minutes} label="Mins" />
          <CountdownBlock count={seconds} label="Secs" />
        </div>
      )
    }
  }

  if (date) {
    return (
      <div className="countdown">
        <img alt="" src="/images/hero.png" className="countdown-hero" />
        <Countdown
          date={date.format()}
          renderer={renderCountdown}
          onComplete={onComplete}
        />
      </div>
    )
  } else {
    return null
  }
}

export default BigCountdown
