function Spinner() {
  return (
    // <div class='loadingSpinerContainer'>
    //     <div class="loadingSpinner"></div>
    // </div>
    <>
      <div class="text-center mt-5">
        <div class="spinner-grow text-primary m-3" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-danger m-3" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-success m-3" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </>
  )
}

export default Spinner