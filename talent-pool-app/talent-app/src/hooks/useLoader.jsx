// hooks/useLoader.js

import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../redux/slices/loaderSlice';

const useLoader = () => {
  const dispatch = useDispatch();

  const handleLoader = async (asyncFunction) => {
    try {
      dispatch(showLoader());
      await asyncFunction(); // Execute passed async function
    } finally {
      dispatch(hideLoader());
    }
  };

  return handleLoader;
};

export default useLoader;
