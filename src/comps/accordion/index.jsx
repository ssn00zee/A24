"use client"

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {useState} from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function AccordionComp({
  title,
  cast,
  index,
  release,
  onClick = () => {},
  movie
}){
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div
      className='md:my-4'
    >
      <Accordion expanded={expanded === `panel${index.toString()}`} onChange={handleChange(`panel${index.toString()}`)} 
      TransitionProps={{ unmountOnExit: true }} 
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          // className='flex justify-between items-center'
        >
          <div 
            className='flex justify-between items-center text-red-700 w-full pr-12'
          >
            <h1
              className=''
            >{title}</h1>
            <h3>{release}</h3>
          </div>
        </AccordionSummary>
        <AccordionDetails
          className='flex justify-between items-center gap-8 p-8'
        >
          <p>
            {cast}
          </p>
          <Link 
            href={{
              pathname: '/info',
              query: {
                name : encodeURIComponent(movie.title),
                cast : movie.Starring.replace(/[\[\]']+/g,''),
                runtime : movie["Running time (int)"],
                releaseDate : encodeURIComponent(movie["Release dates (datetime)"].replace(/^(\d{4})-\d{2}-\d{2}$/, '$1'))
              }
            }}
          >
            <Button
              variant='outlined'
              className='p-1 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 md:p-2'
            >
              Details
            </Button>
          </Link>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}