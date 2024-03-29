import React from 'react';
import GoogleBookSearch from "./GoogleBookSearchComponent";
import { useState } from "react";
import useFetchFunction from "../../fetch/useFetchFunction";
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const BooksPage = () => {
    const [q, setQ] = useState("");
    const [url, setUrl] = useState(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=m9OZKl3eJ6pyqeGPv8eRruQPiAS0yVrz`)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (q !== "") {
            setUrl(`https://www.googleapis.com/books/v1/volumes?q=${q}&orderBy=relevance&zoom=0&key=${process.env.REACT_APP_GOOGLE_BOOK_SEARCH_API}&maxResults=15&projection=full&printType=books`);
        }
        else if (q === "") {
            setUrl(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=m9OZKl3eJ6pyqeGPv8eRruQPiAS0yVrz`);
        }

    }
    const { data, isPending, error } = useFetchFunction(url);
    return (
        <>
            <div className="bookspageBody">
                <div className="shadow-2xl  pb-5 sm:pb-0 bookstitle grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    <h1 className=" font-bold text-center ml-5 text-2xl pt-5 sm:pb-5 sm:text-left">BOOKS</h1>
                    <div>
                        <div className="shadow grid pt-5 mr-5 ml-5">
                            <form onSubmit={handleSubmit} className="grid grid-cols-12">
                                <input
                                    onChange={e => setQ(e.target.value)}
                                    value={q}
                                    className="my-input col-span-8 rounded p-2  " type="text" placeholder="Search..." />
                                <button
                                    type="submit"
                                    className=" my-btn w-auto col-span-4 rounded bg-white  flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                                    <i className='material-icons'>search</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    {isPending && <LoadingComponent/>}
                    {error && <div>{error}</div>}
                    {data && <GoogleBookSearch data={data} />}
                   
                </div>

            </div>
        </>
    );
}

export default BooksPage;