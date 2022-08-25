import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    if (count === 0) {
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="example mt-5 pt-5 text-center">
      <Text>{`Redirecting in ${count} seconds `} </Text>
    </div>
  );
};

export default Redirect;
