'use client'
import React from 'react';
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// import Link from "next/link";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import Tooltip from './toolTip';
// import Image from 'next/image';
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "@/store/store";
// import { getMovieId } from "@/store/slices/conterSlice";
// import { useRouter } from "next/navigation";

interface movieCardProps{
    poster_path:string,
    original_title:string,
    vote_average:number,
    movie_id:string
}

const MovieCard:React.FC<movieCardProps> = ({poster_path,original_title,vote_average,movie_id}) => {
    // const dispatch = useDispatch<AppDispatch>();
    // const router = useRouter();
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>,movie_id:string)=>{
        // dispatch(getMovieId(movie_id));
        // console.log('movie id in card',movie_id)
        // router.refresh();
    }
    return (
        <div className='w-full bg-white rounded-xl overflow-hidden group hover:bg-c1'>
        <div className='aspect-[2/3] relative overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`${original_title}`} />
        </div>
        <div className='p-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1 '>
                    <HiStar color='green' />{vote_average.toFixed(1)}
                </span>
                <span className='cursor-pointer'>
                    <Tooltip content='Add to Favorites'>
                            <HiOutlineStar />
                    </Tooltip>
                </span>
            </div>
            <div className='h-10'>
                <p className='text-base/[20px] font-medium line-clamp-2'>{original_title}</p>
            </div>

            {/* <p className='text-sm'>{item.overview}</p> */}
            {/* <Link href={'/'} onClick={handleClick} className='text-center cursor-pointer hover:text-primary_1'>View More</Link> */}
            <button onClick={(e)=>handleClick(e,movie_id)} className='cursor-pointer'>View More</button>
        </div>
    </div>
    )
}

export default MovieCard;