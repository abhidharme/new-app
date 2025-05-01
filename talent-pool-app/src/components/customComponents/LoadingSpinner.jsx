import loadingGif from "../../assets/loadingspinner.gif"; // your custom gif

const LoadingSpinner = ({ loader }) => {
  if (!loader) return null;

  return (
    <div className="global-loader">
      <div className="loader-content">
        <img src={loadingGif} alt="Loading..." width={100} height={100}  priority />
        {/* Optional text */}
        {/* <p>Loading...</p> */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
