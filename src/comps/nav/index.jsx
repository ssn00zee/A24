import Image from "next/image"
import { useRouter } from "next/router"


export default function Nav(){

  const r = useRouter()

  return (
  
    <div
      className="flex items-center justify-center flex-wrap bg-white h-16"
    >

    <Image 
      src={'/A24logo.svg'}
      height={48}
      width={64}
      onClick={() => {
        r.push('/')
      }}
      className={'hover:cursor-pointer'}
    />

    </div>
  
  )
}