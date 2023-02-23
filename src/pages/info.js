import useRouter from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"


export default function Info(){

  
  const [foundMovie, setFoundMovie] = useState()
  const [title, setTitle] = useState('')
  const [cast, setCast] = useState('')
  const [image, setImage] = useState()
  
  
  
  
  const findImage = async (title) => {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-videos',
      params: {tconst: title, limit: '25', region: 'US'},
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    }
    
    try {
      const res = await axios.request(options)
      
      console.log(res.data.resource.image.url, 'image')
      setImage(res.data.resource.image.url)
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    const r = useRouter
    const findMovie = async () => {
      
      const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API}&t=${r.query.name}&y=${r.query.releaseDate}&plot=full`
      
      try {
        const res = await axios.get(url)
        setFoundMovie(res.data)
        findImage(res.data.imdbID)
      } catch (e) {
        console.log(e)
      }
    }
    findMovie()
    setTitle(decodeURIComponent(r.query.name))
    setCast(r.query.cast)
  },[])

  return (
    <>
    <Head>
      <title>A24 Movie Catalogue</title>
      <meta name="description" content="A24 Movie Catalogue" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/A24logo.svg" />
    </Head>
    <main
      className="flex justify-center items-center flex-col "
    >
      <div
        className="w-full h-[calc(100vh_-_4rem)] grid sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8  justify-center px-4 py-1"
      >
        <div
          className="w-full h-full flex justify-center items-center flex-col container"
        >
          {image  && 
            <Image 
              src={`${image}`}
              width={500}
              height={750}
              alt={'movie poster'}
              className={'md:max-w-[500px] md:max-h-[750px] sm:max-w-[250px] sm:max-h-[375px] container'}
            />
          }
        </div>


        <div
          className="w-full h-full  md:flex justify-center flex-col container"
          >
          <h1
            className="md:text-6xl sm:text-2xl font-normal leading-normal mt-0 mb-2 text-pink-800"
            >
            {title}
          </h1>
          <p
            className="md:text-3xl sm:text-xl font-normal leading-normal mt-0 mb-2 text-pink-800"
            >
            {cast}
          </p>
          <p
            className="pb-4"
            >
            {foundMovie && 
             foundMovie.Plot
            }
          </p>
        </div>
      </div>

    </main>
    </>
  )
}