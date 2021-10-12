import React from 'react'
import useDeviceMode from '../../hooks/useDeviceMode';
import { Button } from '../button';

import Typography from '../typography/Typography'

const CardBase: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({setDrawerVisible}) => {
  const { isMobile } = useDeviceMode();

  return (
    <div className="flex flex-col items-center gap-8 about-container px-4 sm:px-0">
      <div>
        <Typography level="display" className="welcome-header">
          Welcome to the Solend IDO
        </Typography>
      </div>
      <img alt="" src="/images/hero.png" className="hero" />
      <Typography color="secondary" className="px-4 sm:px-0">
        <Typography>What is this?</Typography>
        <br />
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
        <br />
        <br />
        <Typography>Is this that thing that is that?</Typography>
        <br />
        Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
        sit amet orci. Aenean dignissim pellentesque felis.
      </Typography>
      {isMobile && <Button
        onClick={() => setDrawerVisible(true)}
        className="w-full"
      >
        Participate
      </Button>}
    </div>
  )
}

export default CardBase
