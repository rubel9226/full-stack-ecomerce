import { useContext, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { loginUser } from "../../API/authApi/authApi";

export default function Login()  {

  const {user, setUser} = useContext(AuthContext);
  console.log(user)
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      console.log('ami user')
      const user = await loginUser(formData);
      console.log('tumi ke')
      setUser(user);
  
      // redirect
      if(user.role === 'admin') navigate('/admin');
      else if(user.role === 'vendor') navigate('/vendor');
      else navigate('/user');
    } catch (error) {
      console.log(error)
      alert("Login failed.")  
    }
  };

  return (


    <div className="min-h-screen flex items-center justify-center bg-white">
      <div>
        <div className="py-7 px-5">

          <Link to={-1} className="flex items-center gap-1 hover:link">
            <MdArrowBackIos />
            <p className="">Back To Home</p>
          </Link>

          <div className="text-center pt-2">
            <Link to={'/'} className="text-3xl font-bold text-[#1F5DA0]">Thrivon Fashion</Link>
          </div>
        </div>

        <div className="w-full max-w-md border border-gray-200 p-8 rounded-xl shadow-sm">
          
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-[15px] text-black/50 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[15px] text-black/50 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#1F5DA0] text-white py-2 rounded-lg hover:bg-[#104278] transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-[15px] text-black/50 font-medium mt-4">
            Don’t have an account?{" "}
            <Link to={'/register'} className="lin hover:link text-black font-medium cursor-pointer">
              Sign up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}