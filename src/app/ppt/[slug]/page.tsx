import SlidesPage from "@/app/ppt/[slug]/slides";
import {Presentation} from "@/app/types/presentation";
import {fetchSampleData} from "@/app/api/fetchSampleData";

type PptParams = {
    params: {slug: string}
}
export default async function PptPage({params}: PptParams) {
    const data: Presentation = await fetchSampleData(decodeURIComponent(params.slug))
    const slides = data.arr_slides
    return (
        <section className={"h-full min-h-screen w-full min-w-full flex flex-col justify-center items-center p-4 bg-[#f9f5d7]"}>
            <h1 className={"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"}>
                {data["Intro Title"]}
            </h1>
            <h1 className={"scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"}>
                {data["Intro Subtitle"]}
            </h1>
            <SlidesPage slides={slides}/>
        </section>
    )
}
