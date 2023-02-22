import Image from "next/image"


export default function Nav(){

  return (
    <>
    <div
      className="flex items-center justify-center flex-wrap bg-white p-6 h-16"
    >

    <Image 
      src={'/A24logo.svg'}
      height={48}
      width={64}
    />

    </div>
    </>
  )
}