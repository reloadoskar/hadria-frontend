import { useState } from 'react';

const useSelectForm = () => {
  const [isShowing, setIsShowing] = useState({name: '', showing: false});

  function showForm(name) {
    setIsShowing({name: name, showing: !isShowing.showing });
  }

  return {
    isShowing,
    showForm,
  }
};

export default useSelectForm;