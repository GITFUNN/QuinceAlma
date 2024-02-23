import { createInvitationRequest } from '../api/general.ts'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;



const MainPage = () => {
  const [name, setName] = useState("");
  const [assist, setAssist] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);






  const createMutation = useMutation({
    mutationFn: () => createInvitationRequest(name, assist),
    onSuccess: () => {
    },

    onError: (error) => {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('An error occurred');
        console.log(error);
      }
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutation.mutate();

  }
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



  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-flowers bg-fixed">
        <div className="flex flex-col justify-center items-center font-serif">
          <h1 className='text-8xl text-white sm:text-9xl select-none'>Alma</h1>
          <h2 className='text-5xl  text-white sm:text-6xl select-none'>Mis XV</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-28 font-serif">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}


        >
          <h2 className="text-amber-400 text-3xl text-center">Domingo</h2>
          <h1 className="text-amber-200 text-6xl pt-2 font-sans">27.05.2024</h1>
        </motion.div>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.2, delay: 0.5 }}
          >
            <h2 className="text-amber-400 text-3xl pt-4 text-center ">22:00 HS</h2>
            <h3 className="pt-4 text-nowrap">La Usina, Gral. Galarza, Entre Ríos</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 25 }}
            viewport={{ once: false }}
            transition={{ type: "spring", bounce: 0.2, duration: 1.2, delay: 0.5 }}
          >
            <a className="flex justify-center text-xl pt-4" href="https://www.google.com/maps/place/La+USINA+Disco/@-32.7215032,-59.3958566,17z/data=!3m1!4b1!4m6!3m5!1s0x95b0e77c09bc2c3d:0x7722ef3ed1ca3818!8m2!3d-32.7215032!4d-59.3932817!16s%2Fg%2F11ghpyt231?entry=ttu" target="_blank">VER UBICACIÓN</a>
          </motion.div>

        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-28 font-serif">
        
      </div>

    </>
  );  
};
export default MainPage;