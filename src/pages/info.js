import useRouter from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"
import Image from "next/image"


export default function Info(){

  const r = useRouter

  const [foundMovie, setFoundMovie] = useState()
  const [title, setTitle] = useState('')
  const [cast, setCast] = useState('')
  const [image, setImage] = useState()


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
    findMovie()
    setTitle(decodeURIComponent(r.query.name))
    setCast(r.query.cast)
  },[])

  return (
    <>
      <div
        className="w-screen h-screen grid sm:grid-rows-2 md:grid-cols-2"
      >
          {image  && 
        <div
          className="w-full h-full flex justify-start items-center flex-col md:h-screen"
        >
          <Image 
            src={`${image}`}
            width={500}
            height={750}
            alt={'movie poster'}
            className={'md:max-w-[500px] md:max-h-[750px] sm:max-w-[250px] sm:max-h-[375px]'}
            />
        </div>
          }
        <div
          className="w-full h-full md:h-screen"
        >
          <h1>
            {title}
          </h1>
          <p>
            {cast}
          </p>
          <p>
            {foundMovie && 
             foundMovie.Plot
            }
          </p>
        </div>
      </div>
    </>
  )
}