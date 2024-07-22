const CorsesLoadingPage = () => {
  return (
    <div className="max-w-7xl mx-auto my-16 flex flex-col gap-6">
      {
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse flex gap-6">
            <div className="h-52 bg-gray-300 rounded w-1/2"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-300"></div>
              <div className="bg-gray-300"></div>
              <div className="bg-gray-300"></div>
              <div className="bg-gray-300"></div>
              <div className="bg-gray-300"></div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default CorsesLoadingPage