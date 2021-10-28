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
      <div className="flex flex-col items-center w-14 sm:w-100 pt-4 overflow-hidden">
        <Typography level={isMobile ? undefined : 'display'} className="count">
          {count}
        </Typography>
        <Typography>{label}</Typography>
      </div>
    </>
  )
}

interface BigCountdownProps {
  date: moment.Moment
  onComplete: () => void
}

const BigCountdown: React.FC<BigCountdownProps> = ({ date, onComplete }) => {
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <section className="flex items-center justify-center mb-10 sm:mb-16">
        <CountdownBlock count={days} label="DAYS" />
        <CountdownBlock count={hours} label="HOURS" />
        <CountdownBlock count={minutes} label="MINS" />
        <CountdownBlock count={seconds} label="SECS" />
      </section>
    )
  }

  if (date) {
    return (
      <Countdown
        date={date.format()}
        renderer={renderCountdown}
        onComplete={onComplete}
      />
    )
  } else {
    return null
  }
}

export default BigCountdown
