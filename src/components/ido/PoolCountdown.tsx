import classNames from 'classnames'
import moment from 'moment'
import Countdown from 'react-countdown'

import { useRefresh } from '../../hooks/useRefresh'
import Typography from '../typography/Typography'

interface PoolCountdownProps {
  date: moment.Moment
  poolStatus: string
  className?: string
}

const PoolCountdown: React.FC<PoolCountdownProps> = ({
  date,
  poolStatus,
  className,
}) => {
  const { doForceRefresh } = useRefresh()

  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    hours += days * 24
    if (completed) {
      return <p className="text-sm mt-2 py-2 text-center">{poolStatus}</p>
    } else {
      return (
        <div className={classNames(className, 'flex items-center')}>
          <div className="flex flex-col items-center">
            <span className="text-center font-bold mx-1 w-8 inline-block">
              <Typography>
                {hours < 10 ? `0${hours}` : hours}
              </Typography>
            </span>
            <span className="text-xs mt-1 text-secondary">hrs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-center font-bold mx-1 w-8 inline-block">
              <Typography>
                {minutes < 10 ? `0${minutes}` : minutes}
              </Typography>
            </span>
            <span className="text-xs mt-1 text-secondary">mins</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-center font-bold mx-1 w-8 inline-block">
              <Typography>
                {seconds < 10 ? `0${seconds}` : seconds}
              </Typography>
            </span>
            <span className="text-xs mt-1 text-secondary">secs</span>
          </div>
        </div>
      )
    }
  }

  if (date) {
    return (
      <Countdown
        date={date.format()}
        renderer={renderCountdown}
        onComplete={doForceRefresh}
      />
    )
  } else {
    return null
  }
}

export default PoolCountdown
