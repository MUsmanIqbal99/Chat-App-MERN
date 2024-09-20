import { Link, useRouteError } from "react-router-dom"
const  Error404 = () => {
  const error = useRouteError();
  return (
    <>
      <div id="error-page" className="min-h-screen flex flex-col justify-center items-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={'/'} className="w-fit px-8 py-3 mt-8 bg-blue-600 text-gray-50 rounded-md hover:text-gray-300">Go to Home</Link>
    </div>
    </>
  )
}

export default Error404