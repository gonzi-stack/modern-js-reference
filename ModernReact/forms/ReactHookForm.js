import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input 
          {...register('name', { required: 'Name is required' })} 
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>
      
      <div>
        <label>Email</label>
        <input 
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })} 
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      
      <div>
        <label>Password</label>
        <input 
          type="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })} 
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
