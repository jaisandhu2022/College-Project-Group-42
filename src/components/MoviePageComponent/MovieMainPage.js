import useFetchFunction from "../../fetch/useFetchFunction";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import MovieDetsilsPopup from "./MovieDetailsPopup";

const MovieMainPage = () => {
    const type = "now_playing";
    const { data, isPending, error } = useFetchFunction(`https://api.themoviedb.org/3/movie/${type}?api_key=5ecdf326904f655d61e243e580b41332&language=en-US&page=1`);

    return (<>
        <div className="body-background pb-20 pt-5 sm:pt-10">

            {isPending && <LoadingComponent />}
            {error && <div>{error}</div>}
            {data && (<div>
                <section
                    className="grid grid-cols-2 gap-2 px-3 sm:gap-3 px-5 sm:px-10
              sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 xl:gap-4 md:gap-4
              "  >
                    {data.results.map((movie) => {
                        const {
                            id,
                        } = movie;
                        return (
                            <div key={id}
                                className="trensform bg-gray-100 px-0 py-0 pb-0 sm:pb-0 rounded-lg my-bookView"  >
                                <MovieDetsilsPopup movie={movie} />
                            </div>
                        );
                    }
                    )}
                </section>

            </div>)}

        </div>
    </>);
}

export default MovieMainPage;