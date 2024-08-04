// buat komponen react halaman register dengan desain dari tailwindcss
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   tambahkan password_confirmation
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(name, email, password, password_confirmation);    
      console.log('Register successful');
      // Redirect ke halaman login
        navigate('/login');
    }
    catch (error) {
      console.error('Register failed:', error);
    }
    }

    return (
        <div className="h-full bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register your account
                </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                    </label>
                    <div className="mt-2">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="mt-2">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                {/* tambahkan confirm password */}
                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                    </label>
                    <div className="mt-2">
                    <input
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <button
                    onClick={handleRegister}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Register
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Register;
