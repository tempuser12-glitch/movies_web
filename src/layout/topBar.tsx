import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlineSearch, HiMenu } from "react-icons/hi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ApiServices } from "../services/apiServices";
// import { useNavigate } from "react-router";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "@/store/store";
// import { getMovieId } from "@/store/slices/conterSlice";

const TopBar = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState('');
    // const [openSuggestions,setOpenSuggestions] = useState<boolean>(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // const navigate = useNavigate();

    // const router = useRouter();
    // const dispatch = useDispatch<AppDispatch>();

    const handleClick = (movie_id: string, title: string) => {
        // dispatch(getMovieId(movie_id));
        // router.push(`/viewmovie`);
        // navigate('/viewmovie')
        setSearch('');
        setSuggestions([]);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const fetchData = async () => {
        await ApiServices.get(`/search/movie?query=${search}&language=en-US&page=1`)
            .then((data) => setSuggestions(data.results))
            .catch((err) => { console.log("error", err) });
    }

    useEffect(() => {
        fetchData();
    }, [debouncedValue]);

    const getReleaseYear = (release_date: string): string => {
        return release_date ? release_date.slice(0, 4) : 'Not Available';
    }

    // debounce
    useEffect(() => {
        // Clear any existing timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Set new debounce timeout
        debounceRef.current = setTimeout(() => {
            setDebouncedValue(search); // Update debounced value
        }, 300); // 500ms delay

        // Cleanup timeout on unmount or input change
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);
    return (
        <div className="h-[60px] w-full px-4 bg-c5">
            <div className="flex items-center justify-between gap-4 max-w-[1200px] mx-auto h-full relative">
                {/* lefts */}
                <div className="inline-flex items-center gap-4">
                    <span className=''>
                        LOGO
                    </span>
                    <span className="inline-flex items-center gap-1 cursor-pointer"><HiMenu />Menu</span>
                </div>

                {/* center */}
                <div className="absolute grow inline-flex items-center border rounded-4xl border-bordercolor px-1.5 h-[40px] bg-white w-full z-10 md:relative md:max-w-xl md:mx-auto  focus-within:border-c3 focus:shadow-inputs hover:border-c3">
                    <HiOutlineSearch className="w-4" />
                    <input onChange={handleChange} className="outline-none pl-1 grow" type="text" value={search} />
                    {
                        search.trim().length > 0 && <div className="fixed bg-c5 top-[60px] w-full md:w-xl py-2 left-[50%] -translate-x-[50%] max-h-80 overflow-y-auto z-9 md:bg-c1 md:rounded-lg md:absolute md:top-12">
                            {
                                suggestions.map((item: any, index: number) => (
                                    <div key={index} className="flex gap-2 py-1 cursor-pointer hover:bg-gray-500 hover:text-white px-4" onClick={() => handleClick(item.id, item.title)}>
                                        <div className="w-10 h-10 rounded-md relative overflow-hidden shrink-0">
                                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-normal block">{item.title}</span>
                                            <span className="text-xs font-medium">{getReleaseYear(item.release_date)}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                {/* <div className="absolute w-full h-8 bg-amber-500 left-0">

                </div> */}

                {/* rights */}
                <div className="inline-flex items-center gap-4">
                    <span className="md:hidden"><HiOutlineSearch /></span>
                    <span className="inline-flex items-center gap-1 cursor-pointer"><MdOutlineAddToPhotos />WatchList</span>
                    <span className="whitespace-nowrap"><button>Sign In</button></span>
                </div>


            </div>
        </div>
    )
}

export default TopBar
