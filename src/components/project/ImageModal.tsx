import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ZoomInIcon } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"

type ImageCarouselProp = {
  media: string[]
  alt: string
}

function ImageCarousel({media, alt}: ImageCarouselProp) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {media.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent>
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={0}
                  style={{objectFit: "fill"}}
                  className="rounded-sm"
                   />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {
        media.length > 1 && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg hover:bg-gray-100" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg hover:bg-gray-100" /> 
          </>
        )
      }

  </Carousel>
  )
}


type ImageModalProp = {
  media: string[]
  alt: string
  title: string
}
export default function ImageModal({media, alt, title}: ImageModalProp) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer w-full h">
          <Image
          src={media[0]}
          alt={alt}
          width={350}
          height={0}
          style={{objectFit: "cover"}}
          className="w-full rounded-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomInIcon className="h-10 w-10 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-4">
        <DialogTitle>{title}</DialogTitle>
        <div className="relative">
        <ImageCarousel media={media} alt={alt}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}