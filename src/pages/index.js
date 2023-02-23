import Head from 'next/head'
import movies from 'data/a24.json'
import Nav from '@/comps/nav'
import AccordionComp from '@/comps/accordion'
import Image from 'next/image'

export default function Home() {


  return (
    <>
      <Head>
        <title>A24 Movie Catalogue</title>
        <meta name="description" content="A24 Movie Catalogue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/A24logo.svg" />
      </Head>
    <main
      className='flex overflow-y-hidden flex-col'
    >
      <div
        className='w-screen h-[calc(100vh_-_4rem)] grid sm:grid-cols-1 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1'
      >
        <div 
          className='h-full w-full flex justify-between items-center flex-col md:p-6'
        >
          <div
            className='sm:max-w-[250px] sm:max-h-[375px]'
          >
            <Image
              src={'/A24logo.svg'}
              width={450}
              height={600}
              className={'container'}
              alt='A24 Studio'
            />
          </div>
          <p 
            className='md:max-w-md max-w-sm sm:text-s sm:w-full p-2'
          >
            {`A24 is a lauded American entertainment conglomerate acclaimed for its diverse and highly-regarded cinematic repertoire, featuring iconic titles such as "Moonlight," "Lady Bird," and "The Florida Project."`}
            <br />
            {`This multimedia powerhouse has also established a commanding presence in the television and publishing sectors through its highly successful productions and publications, under the banner of A24 Books. 
            The organization's minimalistic yet arresting logo and dynamic social media presence exemplify its unique brand identity as a visionary leader and influencer in the entertainment industry.`}
          </p>
        </div>
        <div
          className='w-full h-full overflow-y-scroll'
        >
        {
          movies &&
          movies.map((movie, i) => {
            return (
              <AccordionComp 
                title={movie.title} 
                cast={movie.Starring.replace(/[\[\]']+/g,'')} 
                index={i+1} 
                key={i}
                release={movie["Release dates (datetime)"].replace(/^(\d{4})-\d{2}-\d{2}$/, '$1')}
                movie={movie}
              />
            )
          })
        }

        </div>
      </div>
    </main>
  </>
  )
}
