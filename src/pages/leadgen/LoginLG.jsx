import { useState } from "react"
import { Link } from 'react-router-dom'
import { useLoginLG } from "../../hooks/useLoginLG"

const LoginLG = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginLG, error, isLoading } = useLoginLG()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await loginLG(email, password)
  }

  return (
    <section className="bg-[#0c101b] min-h-screen flex items-center justify-center">

      <div className="bg-[#141b2d] flex rounded-2xl shadow-lg max-w-3xl
      p-5 items-center">

        <div className="md:w-1/2 px-8 md:px-16">
        <img
            src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" 
            className="image-xl mt-3
            rounded cursor-pointer block float-left mr-2"
          />
          <h2 className="font-bold text-3xl text-[#f4f5fd] mt-3">Chromagen</h2>
          <p className="text-xs mt-4 text-[#f4f5fd]">If you are already a member, easily log in</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-2 mt-8 rounded-xl border"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />

          <div className="relative">
          <input
            className="p-2 rounded-xl border w-full"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <img src={process.env.PUBLIC_URL + '/eye.svg'} alt="eye" className="absolute top-1/2 right-3 -translate-y-1/2"/>
          </div>
          <button disabled={isLoading} className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Log In</button>
          {error && <div className="error">{error}</div>}
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 
          duration-300 text-[#002D74]">
          <img src={process.env.PUBLIC_URL + '/google.svg'} alt="google" className="mr-3"/>
          Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#f4f5fd] py-4 text-[#f4f5fd]">
          <Link to="/">Forgot your password?</Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img src={process.env.PUBLIC_URL + '/slay.png'} alt="Chromagen Logo" className="rounded-2xl shadow-lg"/>
        </div>

      </div>
    </section>
  )
}

export default LoginLG