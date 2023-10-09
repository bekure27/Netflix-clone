import SavedMovies from "./SavedMovies";

function UserPage() {
  return (
    <>
      <div className="w-full text-white ">
        <img
          className="w-full h-[350px] object-cover"
          src="/images/cover.jpg"
          alt="/"
        />

        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl mb-4 md:text-5xl font-bold">
            Your Favorite movies place{" "}
          </h1>
        </div>
      </div>
      <SavedMovies />
    </>
  );
}

export default UserPage