   
   "use client";
   import {motion} from "framer-motion"

   export default function ClientButtonSignup(){

    return (
        <motion.button
            className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}>

        SignUp
      </motion.button>
    );
}

 