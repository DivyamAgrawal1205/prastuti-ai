'use client'

import {
    Carousel,
    CarouselContent, CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {PresentationArr_slides} from "@/app/types/presentation";

export default function SlidesPage({slides}: {slides: PresentationArr_slides[]}) {
    return (
        <section className={"h-full min-h-fit w-full min-w-full flex flex-col justify-center items-center"}>
            <Carousel className="w-[1400px] h-fit m-2 max-w-[1400px] border border-black rounded-md p-4 bg-gradient-to-r from-amber-200 to-yellow-400">
                <CarouselContent >
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <h2 className={"scroll-m-20 border-b border-black pb-2 text-5xl font-semibold tracking-tight first:mt-0"}>
                                    {slide.Heading}
                                </h2>
                                <ul className={"my-6 ml-6 list-disc [&>li]:m-12"}>
                                    {slide.Content.map((content, index) => {
                                        return (
                                            <li className={"text-3xl"} key={index}>
                                                {content}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </section>
    )
}
