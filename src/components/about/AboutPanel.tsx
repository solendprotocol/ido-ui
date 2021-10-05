import React from 'react'

import Typography from '../typography/Typography'

const CardBase: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-8" style={{ width: 600 }}>
      <div>
        <Typography level="display" className="">
          Welcome to the Solend IDO
        </Typography>
      </div>
      <img alt="" src="/images/hero.png" className="hero" />
      <Typography color="secondary">
        <Typography>What is this?</Typography>
        <br />
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
        <br />
        <br />
        <Typography>Is this that thing that is that?</Typography>
        <br />
        Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
        sit amet orci. Aenean dignissim pellentesque felis.
      </Typography>
    </div>
  )
}

export default CardBase
