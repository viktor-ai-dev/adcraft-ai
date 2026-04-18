   
   "use client";
   import {motion} from "framer-motion"

   export default function ClientButtonSignIn(){

    return (
        <motion.button
            className="bg-white text-black px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}>

        Sign In
      </motion.button>
    );
}

 