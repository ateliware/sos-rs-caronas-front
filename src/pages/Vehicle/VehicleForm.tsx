import { useAuthContext } from '@contexts/AuthProvider';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type VehicleFormProps = {
  cnh: string;
  brand: string;
  model: string;
  color: string;
};

export default function VehicleForm() {
  const { login, user, isLoadingRequest } = useAuthContext();

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate('/home');
    return;
  }, [user, navigate]);

  return <></>;
}
