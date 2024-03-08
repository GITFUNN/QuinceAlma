import { createInvitationRequest,createSongRequest, getInvitationRequest, getThemeRequest } from '../api/general.ts'
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import audio from '../audio/audio2.mp3';

  
let contador = 1; 
  const sound = new Audio(audio);

const MainPage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [assist, setAssist] = useState(false);
  const [comments, setComments] = useState("");
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [show, setShow] = useState(false);
  const[show2, setShow2] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState('00');
  const [name2, setName2] = useState("");
  const [song, setSong] = useState("");
  const[isPaussed, setIsPaused] = useState(true);
  const[down, setDown] = useState(false);
  let interval = useRef();






  const startTimer =()=>{
    const countDownDate = new Date('May 7, 2024 00:00:00').getTime();
 

   interval  = setInterval(()=>{

    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds = Math.floor((distance%(1000*60)/1000));
    if (distance < 0) {
      clearInterval(interval.current);
   
    }else{
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }

  }, 1000);
 };


const handleDownClick=()=>{
  setDown(false);
  let section_=1;
  if (contador==0){
    section_=0;
  }
  else if (contador==1 ){
    section_=1;
    
  } else if (contador==2) {
    section_=2;
  }else if (contador==3) {
    section_=3;
  } else if (contador==4){
    section_=4;
    setDown(true);
    
  }

  const section = document.getElementById(`section${section_}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      console.log(contador);
      contador++;
      if (contador >4){
        contador=0;
      }
      
    }
};





 useEffect(()=>{
    startTimer();
    return ()=>{
            clearInterval(interval.current);
    };
 });



  const createMutation = useMutation({
    mutationFn: () => createInvitationRequest(name, assist, comments),
    onSuccess: () => {
      setShow(false);
    },

    onError: (error) => {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        console.log(error);
      }
    },
  });

const createMutationSong = useMutation({
    mutationFn: () => createSongRequest(name2, song),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] })
      setShow2(false);
    },

    onError: (error) => {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        console.log(error);
      }
    },
  });
 const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutationSong.mutate();

  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutation.mutate();

  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const pVariants: Variants = {
    offscreen: {
      display: 'hidden',
    },
    onscreen: {
      display: 'visible',
      transition: {
        delay: 1,
        duration: 0.8,
      }
    }
  };
 
  const handleClick = () => {
    if (isPaussed == false){
          setIsPaused(true);
          sound.pause();
    } else{
      setIsPaused(false);
      sound.play(); 
    }
};



  return (
    <div className="">
      <div className='z-50 fixed right-0 md:p-6 p-2'>
        
        <button onClick={handleClick}>
         {isPaussed &&
        <svg className="md:h-16 md:w-16 h-12 w-12 fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
        }
         
        {!isPaussed &&
        <svg  className="md:h-16 md:w-16 h-12 w-12 fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>}
       </button>
      
      </div>
      {!down &&
      <div className='bottom-0 fixed z-50 right-0 align-middle p-6 animate-bounce cursor-pointer max-md:hidden' onClick={handleDownClick}>
        <svg className="w-10 h-10  fill-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </div>
      }
      {down && 
      <div className='bottom-0 fixed z-50 right-0 align-middle p-6 animate-bounce cursor-pointer max-md:hidden' onClick={handleDownClick}>
      <svg className="w-10 h-10  fill-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
      </div>
      }
      <div id = "section0" className="min-h-screen flex justify-center items-center bg-golden bg-fixed bg-cover">
        <div className="flex flex-col justify-center items-center ">
          <h1 className='text-8xl text-white sm:text-9xl select-none font-bodiee'>Alma</h1>
          <h2 className='text-5xl  text-amber-200 sm:text-6xl select-none font-bodie'>Mis XV</h2>
        </div>
      </div>
      <div id="section1" className="flex flex-col justify-center items-center p-28 font-bodie">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}


        >
          <h2 className="text-amber-400 text-3xl text-center">Sabado</h2>
          <h1 className="text-amber-200 text-6xl pt-2  font-extralight">09.05.2024</h1>
        </motion.div>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.2, delay: 0.5 }}
          >
            <h2 className="text-amber-400 text-3xl pt-4 text-center">22:00 HS</h2>
            <h3 className="pt-4 text-nowrap font-bodie">La Usina, Gral. Galarza, Entre Ríos</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 25 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.2, duration: 1.2, delay: 0.5 }}
          >
            <a className=" font-bodie flex justify-center text-xl text-white rounded-full p-4 sm:bg-amber-200 mt-2 sm:hover:bg-amber-300  bg-amber-300 transition duration-150 " href="https://www.google.com/maps/place/La+USINA+Disco/@-32.7215032,-59.3958566,17z/data=!3m1!4b1!4m6!3m5!1s0x95b0e77c09bc2c3d:0x7722ef3ed1ca3818!8m2!3d-32.7215032!4d-59.3932817!16s%2Fg%2F11ghpyt231?entry=ttu" target="_blank">VER UBICACIÓN</a>

           
          </motion.div>

        </div>
      </div>
<div id="section2"className='flex flex-col justify-center items-center font-bodie '>
        <div className=' pb-28 md:grid md:grid-cols-3 gap-2 md:max-xl:grid-cols-2'>
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}


        >
          <div className='cursor-pointer h-96 w-96 my-1 justify-center items-center bg-photo01 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl '> </div>
          </motion.div>
            <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}


        >
          <div className='h-96 w-96 my-1 justify-center items-center bg-photo02 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl cursor-pointer '></div>
</motion.div>
<motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}


        >
          <div className='h-96 w-96 my-1 justify-center items-center bg-photo03 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl cursor-pointer '></div>
</motion.div>
<motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}


        >
          <div className='h-96 w-96 my-1 justify-center items-center bg-photo01 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl cursor-pointer '></div>
</motion.div>
<motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}
>
          <div className='h-96 w-96 my-1 justify-center items-center bg-photo02 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl cursor-pointer '></div>
</motion.div>
<motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.5 }}
>

          <div   className='h-96 w-96 my-1 justify-center items-center bg-photo03 bg-cover bg-center sm:hover:scale-105 transition duration-300 rounded-xl cursor-pointer '></div>
</motion.div>

        </div>
</div>

      <section id="section3" className="p-10 md:p-24 bg-amber-200">
  <section  className="flex flex-col sm:flex-row justify-center items-center">
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 25 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 1.2,
        delay: 0.5,
      }}
    >
      <div  className="text-center align-top font-bodie">
        <p className="text-white text-3xl font-bodie  ">CUENTA REGRESIVA</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-0 text-center p-8 mb-8 text-lg border-white text-white font-medium">
        <section className="block">
          <p className="text-5xl pb-2 my-2 sm:my-0">{timerDays}</p>
          <p>Dias</p>
        </section>
        <span className="text-5xl hidden sm:block ">:</span>
        <section className="block">
          <p className="text-5xl pb-2 my-2 sm:my-0">{timerHours}</p>
          <p>Horas</p>
        </section>
        <span className="text-5xl hidden sm:block">:</span>
        <section className="block">
          <p className="text-5xl pb-2 my-2 sm:my-0">{timerMinutes}</p>
          <p>Minutos</p>
        </section>
        <span className="text-5xl hidden sm:block">:</span>
        <section className="block">
          <p className="text-5xl pb-2 my-2 sm:my-0">{timerSeconds}</p>
          <p>Segundos</p>
        </section>
      </div>
    </motion.div>
  </section>
</section>
 
      <div className="flex flex-col justify-center items-center py-14 font-bodie ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}

        >
          <h1 className='text-center text-3xl pb-4 text-amber-300 font-medium'>¿Que canción no puede faltar en la fiesta?</h1>
        </motion.div>
                  <h2 className="flex justify-center sm:text-xl text-lg text-white rounded-full p-4 sm:bg-amber-400 mt-2 sm:hover:bg-amber-300 bg-amber-300 transition duration-150 cursor-pointer" onClick={() => setShow2(true)}>SUGERIR CANCIÓN</h2>

        {show2 &&
        <div className ="flex justify-center items-center fixed top-0 left-0 w-full h-full ">
         <div className ="z-50 border border-slate-300 rounded-lg absolute bg-white p-6 max-sm:w-11/12">
          <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative hover:bg-gray-50 rounded-lg cursor-pointer hover:text-amber-400 transition duration-75" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => setShow2(false)}>
        < path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
       <div className="px-4 py-6 space-y-4 ">
        <div className='flex justify-center pb-2'>

        <div className ='text-center' >
        
        <h1 className='text-lg font-medium text-amber-400 '>SUGERIR CANCIÓN</h1>
        </div>
        </div>
         <form className=" " onSubmit={handleSubmit2}>
           
           <div>
            
             <label htmlFor="name" className="block mb-4 text-sm font-medium text-black">Nombre y Apellido</label>
             <div className='flex items-center mb-4'>
             <input
             value={name2}
             onChange={(e) => setName2(e.target.value)}
             type="text" name="rooms_number" id="rooms_number" className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5  focus:border-b-2 focus:border-solid focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent " placeholder="Nombre y Apellido"/>
             </div>                        
             <label htmlFor="name" className="block mb-4 text-sm font-medium text-black">¿Que canción no puede faltar en la fiesta?</label>
             <div className='flex items-center mb-4'>
             <input
             value={song}
             onChange={(e) => setSong(e.target.value)}
             type="text" name="rooms_number" id="rooms_number" className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent " placeholder="Canción"/>
             </div>
           </div>
           
           <div className='flex items-center py-4'>
             
           <button type="submit" className="w-full font-medium text-white bg-amber-400 hover:bg-amber-300 text-sm px-5 py-2 text-center  col-start-2 transition duration-25 rounded-full">Confirmar</button>
           </div>
           </form>
            </div>
            </div>
       
    
        
        </div>
        }

      </div>
      <div id ="section4"className="flex flex-col justify-center items-center p-16 font-serif bg-gradient-to-r from-amber-200 to-fuchsia-700">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}
        >
          <div className='flex justify-center pb-6'>
           <svg className="h-24 w-24 fill-fuchsia-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"/></svg>
          </div>
            <h1 className='flex justify-center text-3xl pb-6 text-fuchsia-900'>INSTAGRAM</h1>
             
           
          

        


        </motion.div>
        <div className='block justify-center text-center text-2xl pb-6 font-bodie font-extralight'>
          <h3>Etiquetame para subir las fotos de recuerdos</h3>
          <h3>que quieras compartir conmigo y las que</h3>
          <h3>saques en mi cumple.</h3>
         
                     </div>
                      <a className=" font-bodie flex justify-center text-xl text-white rounded-full p-2 bg-fuchsia-900 mt-2 hover:bg-fuchsia-800  transition duration-150 " href="https://www.instagram.com/alma.mug/" target="_blank">@alma.mug</a>  

      </div>
      <div className="flex flex-col justify-center items-center p-14 font-serif bg-gradient-to-r from-white to-amber-200">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}

        >
          <div className='text-center block justify-center font-bodie'>
          <h1 className='text-4xl text-amber-500'>Confirmar</h1>
          <h1 className='text-4xl pb-6 text-amber-500'>asistencia</h1>
          <div className='text-2xl pb-6 font-extralight'>
          <h3>Confirmar tu asistencia es fundamental para mí</h3>
          <h3>Además, si tenés alguna restricción</h3>
          <h3>alimentaria, por favor</h3>
          <h3>hacemelo saber</h3>
          </div>

          <div className='relative'>
          </div>
          
          <h2 className="font-medium flex justify-center sm:text-xl text-lg text-white rounded-full p-4 sm:bg-amber-400 mt-2 sm:hover:bg-amber-300 bg-amber-300 transition duration-150 cursor-pointer" onClick={() => setShow(true)}>CONFIRMAR ASISTENCIA</h2>
          </div>
        </motion.div>
        {show &&
        <div className ="flex justify-center items-center fixed top-0 left-0 w-full h-full ">
         <div className ="z-50 border border-slate-300 rounded-lg absolute bg-white p-6 max-sm:w-11/12">
          <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative hover:bg-gray-50 rounded-lg cursor-pointer hover:text-amber-400 transition duration-75" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => setShow(false)}>
        < path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
       <div className="px-4 py-6 space-y-4 ">
        <div className='flex justify-center pb-2'>

        <div className ='text-center' >
        
        <h1 className='text-lg font-medium text-amber-400 '>CONFIRMAR ASISTENCIA</h1>
        </div>
        </div>
         <form className=" " onSubmit={handleSubmit}>
           
           <div>
            
             <label htmlFor="name" className="block mb-4 text-sm font-medium text-black">Nombre y Apellido</label>
             <div className='flex items-center mb-4'>
             <input
             value={name}
             onChange={(e) => setName(e.target.value)}
             type="text" name="name" id="name" className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5  focus:border-b-2 focus:border-solid focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent " placeholder="Nombre y Apellido"/>
             </div>
              <label htmlFor="name" className="block text-sm font-medium mt-4 text-black">¿Asistís a la fiesta?</label>
             <div className='flex items-center mb-4 mt-4'>
             <input 
             checked={assist}
             onChange={() => setAssist(true)}
             type="checkbox" name="asiste" id="asiste" className=" cursor-pointer appearance-none w-4 h-4 border rounded-sm focus:outline-none sm:text-sm mr-2  checked:bg-amber-300" />Si
             <input
             checked={!assist}
             onChange={() => setAssist(false)}
             type="checkbox" name="assist" id="assist" className=" cursor-pointer  appearance-none w-4 h-4 border rounded-sm focus:outline-none sm:text-sm mr-2 ml-2  checked:bg-amber-300" />No
             
             </div>
             
             <label htmlFor="name" className="block mb-4 text-sm font-medium text-black">incluí algún dato importante ej. (Soy celiaco, intolerante a.., vegetariano, etc.)</label>
             <div className='flex items-center mb-4'>
             <input
             value={comments}
             onChange={(e) => setComments(e.target.value)}
             type="text" name="comments" id="comments" className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent " placeholder="Comentarios"/>
             </div>
           </div>
           
           <div className='flex items-center py-4'>
             
           <button type="submit" className="w-full font-medium text-white bg-amber-400 hover:bg-amber-300 text-sm px-5 py-2.5 text-center  col-start-2 transition duration-25 rounded-full">Confirmar</button>
           </div>
           </form>
            </div>
            </div>
       
    
        
        </div>
        }

      </div>
    </div>
  );
};
export default MainPage;