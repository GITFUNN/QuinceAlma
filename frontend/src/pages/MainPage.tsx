import { createInvitationRequest, createSongRequest } from "../api/general.ts";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import audio from "/static/tema1.mp3";

const sound = new Audio(audio);

sound.loop = true;
let contador = 1;
const MainPage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [assist, setAssist] = useState(false);
  const [comments, setComments] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timerDays, setTimerDays] = useState<number>(0);
  const [timerHours, setTimerHours] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [name2, setName2] = useState("");
  const [song, setSong] = useState("");
  const [isPaussed, setIsPaused] = useState(true);
  const [down, setDown] = useState(false);

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date("May 11, 2024 00:00:00").getTime();

    //@ts-expect-error invalid error
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const handleDownClick = () => {
    setDown(false);
    let section_ = 1;
    if (contador == 0) {
      section_ = 0;
    } else if (contador == 1) {
      section_ = 1;
    } else if (contador == 2) {
      section_ = 2;
    } else if (contador == 3) {
      section_ = 3;
    } else if (contador == 4) {
      section_ = 4;
      setDown(true);
    }

    console.log(scrollPosition);

    const section = document.getElementById(`section${section_}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      console.log(contador);
      contador++;
      if (contador > 4) {
        contador = 0;
      }
    }
  };
  const cCurrentVar = interval.current;
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(cCurrentVar);
    };
  });

  const createMutation = useMutation({
    mutationFn: () => createInvitationRequest(name, assist, comments),
    onSuccess: () => {
      setShow(false);
    },
  });

  const createMutationSong = useMutation({
    mutationFn: () => createSongRequest(name2, song),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      setShow2(false);
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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isPaussed == false) {
      setIsPaused(true);
      sound.pause();
    } else {
      setIsPaused(false);
      sound.play();
    }
  };

  return (
    <div className="">
      <div className="z-50 fixed right-0 md:p-6 p-2">
        <button onClick={handleClick}>
          {isPaussed && (
            <svg
              className="md:h-16 md:w-16 h-12 w-12 fill-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
            </svg>
          )}

          {!isPaussed && (
            <svg
              className="md:h-16 md:w-16 h-12 w-12 fill-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
            </svg>
          )}
        </button>
      </div>
      {!down && (
        <div
          className="bottom-0 fixed z-50 right-0 align-middle p-6 animate-bounce cursor-pointer max-md:hidden"
          onClick={handleDownClick}
        >
          <svg
            className="w-10 h-10  fill-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
      )}
      {down && (
        <div
          className="bottom-0 fixed z-50 right-0 align-middle p-6 animate-bounce cursor-pointer max-md:hidden"
          onClick={handleDownClick}
        >
          <svg
            className="w-10 h-10  fill-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </div>
      )}
      <div
        id="section0"
        className="min-h-screen flex justify-center items-center bg-golden2 bg-fixed bg-center bg-no-repeat bg-cover lg:bg-golden2 lg:bg-contain"
      >
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-8xl text-white sm:text-9xl select-none font-bodiee">
            Alma
          </h1>
          <h2 className="text-5xl  text-amber-300 sm:text-6xl select-none font-bodie">
            Mis XV
          </h2>
        </div>
      </div>
      <div
        id="section1"
        className="flex flex-col justify-center items-center p-28 font-bodie"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <h2 className="text-amber-400 text-3xl text-center">Sabado</h2>
          <h1 className="text-amber-200 text-6xl pt-2  font-extralight">
            11.05.2024
          </h1>
        </motion.div>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.5,
            }}
          >
            <h2 className="text-amber-400 text-3xl pt-4 text-center">
              21:00 HS
            </h2>
            <h3 className="pt-4 text-nowrap font-bodie">
              La Usina, Gral. Galarza, Entre Ríos
            </h3>
          </motion.div>
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
            <a
              className=" font-bodie flex justify-center text-xl text-white rounded-full p-4 sm:bg-amber-200 mt-2 sm:hover:bg-amber-300  bg-amber-300 transition duration-150 "
              href="https://www.google.com/maps/place/La+USINA+Disco/@-32.7215032,-59.3958566,17z/data=!3m1!4b1!4m6!3m5!1s0x95b0e77c09bc2c3d:0x7722ef3ed1ca3818!8m2!3d-32.7215032!4d-59.3932817!16s%2Fg%2F11ghpyt231?entry=ttu"
              target="_blank"
            >
              VER UBICACIÓN
            </a>
          </motion.div>
        </div>
      </div>
      <div
        id="section2"
        className="  flex flex-col justify-center items-center font-bodie bg-gradient-to-r from-white to-amber-50"
      >
        <div className=" pb-28 md:grid md:grid-cols-3 gap-2 md:max-xl:grid-cols-2">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.8,
            }}
          >
            <div className="cursor-pointer h-96 w-96 my-1 justify-center items-center bg-photo02 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl focus:absolute "></div>
          </motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.8,
            }}
          >
            <div className="h-96 w-96 my-1 justify-center items-center bg-photo06 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl cursor-pointer "></div>
          </motion.div>
          <motion.div
            initial={{ x: 150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.8,
            }}
          >
            <div className="h-96 w-96 my-1 justify-center items-center bg-photo04 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl cursor-pointer "></div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.5,
            }}
          >
            <div className="h-96 w-96 my-1 justify-center items-center bg-photo05 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl cursor-pointer "></div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.5,
            }}
          >
            <div className="h-96 w-96 my-1 justify-center items-center bg-photo03 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl cursor-pointer "></div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.2,
              delay: 0.5,
            }}
          >
            <div className="h-96 w-96 my-1 justify-center items-center bg-photo01 bg-cover bg-center sm:hover:scale-110 transition duration-300 rounded-xl cursor-pointer "></div>
          </motion.div>
        </div>
      </div>

      <section id="section3" className="p-10 md:p-24 bg-amber-200">
        <section className="flex flex-col sm:flex-row justify-center items-center">
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
            <div className="text-center align-top font-bodie">
              <p className="text-white text-3xl font-bodie  ">
                CUENTA REGRESIVA
              </p>
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
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <h1 className="text-center text-3xl pb-4 text-amber-300 font-medium">
            ¿Que canción no puede faltar en la fiesta?
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.2, duration: 1, delay: 0.5 }}
        >
          <h2
            className="flex justify-center sm:text-xl text-lg text-white rounded-full p-4 sm:bg-amber-400 mt-2 sm:hover:bg-amber-300 bg-amber-300 transition duration-150 cursor-pointer"
            onClick={() => setShow2(true)}
          >
            SUGERIR CANCIÓN
          </h2>
        </motion.div>
        {show2 && (
          <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full ">
            <div className="z-50 border border-slate-300 rounded-lg absolute bg-white p-6 max-sm:w-11/12">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 relative hover:bg-gray-50 rounded-lg cursor-pointer hover:text-amber-400 transition duration-75"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  onClick={() => setShow2(false)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="px-4 py-6 space-y-4 ">
                <div className="flex justify-center pb-2">
                  <div className="text-center">
                    <h1 className="text-lg font-medium text-amber-400 ">
                      SUGERIR CANCIÓN
                    </h1>
                  </div>
                </div>
                <form className=" " onSubmit={handleSubmit2}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-4 text-sm font-medium text-black"
                    >
                      Nombre y Apellido
                    </label>
                    <div className="flex items-center mb-4">
                      <input
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        type="text"
                        name="rooms_number"
                        id="rooms_number"
                        className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5  focus:border-b-2 focus:border-solid focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent "
                        placeholder="Nombre y Apellido"
                      />
                    </div>
                    <label
                      htmlFor="name"
                      className="block mb-4 text-sm font-medium text-black"
                    >
                      ¿Que canción no puede faltar en la fiesta?
                    </label>
                    <div className="flex items-center mb-4">
                      <input
                        value={song}
                        onChange={(e) => setSong(e.target.value)}
                        type="text"
                        name="rooms_number"
                        id="rooms_number"
                        className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent "
                        placeholder="Canción"
                      />
                    </div>
                  </div>

                  <div className="flex items-center py-4">
                    <button
                      type="submit"
                      className="w-full font-medium text-white bg-amber-400 hover:bg-amber-300 text-sm px-5 py-2 text-center  col-start-2 transition duration-25 rounded-full"
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        id="section4"
        className="flex flex-col justify-center items-center p-16 font-serif bg-gradient-to-r from-amber-200 to-fuchsia-700"
      >
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <div className="flex justify-center pb-6">
            <img className="h-24 w-24" src="/static/Instagram_icon.png"></img>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <h1 className="flex justify-center text-3xl pb-6 text-fuchsia-800/75 font-bodie font-semibold">
            INSTAGRAM
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <div className="block justify-center text-center text-2xl pb-6 font-light  text-fuchsia-900/100">
            <h3>Etiquetame para subir las fotos de recuerdos</h3>
            <h3>que quieras compartir conmigo y las que</h3>
            <h3>saques en mi cumple.</h3>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <a
            className=" font-bodie flex justify-center text-xl text-white rounded-full p-2 bg-gradient-to-tr from-orange-400 to-fuchsia-700 mt-2 hover:bg-fuchsia-800  transition duration-150 "
            href="https://www.instagram.com/alma.mug/"
            target="_blank"
          >
            @alma.mug
          </a>
        </motion.div>
      </div>
      <div
        id="section4"
        className="flex flex-col justify-center items-center p-16 font-serif bg-white text-amber-300"
      >
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <div className="flex justify-center pb-6">
            <svg
              className="h-20 w-20 fill-none stroke-amber-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <h1 className="flex justify-center text-3xl pb-6  font-bodie font-medium">
            REGALO
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            delay: 0.5,
          }}
        >
          <div className="block justify-center text-center text-2xl pb-6 font-bodie text-amber-300 lg:w-[400px]">
            <h3 className="">
              tu presencia es el regalo mas importante pero si deseas regalarme
              algo
            </h3>
            <h3>habra un cofre en la entrada</h3>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center items-center p-14 font-serif bg-amber-200">
        <div className="text-center block justify-center font-bodie">
          <motion.div
            initial={{ x: 150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
              delay: 0.5,
            }}
          >
            <div className="flex justify-center pb-6">
              <svg
                className="fill-none stroke-white w-20 h-20 stroke-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.4,
              delay: 0.5,
            }}
          >
            <h1 className="text-4xl text-white font-bodie font-medium ">
              Confirmar
            </h1>
            <h1 className="text-4xl pb-6 text-white  font-bodie font-medium">
              asistencia
            </h1>
            <div className="text-2xl pb-6 text-white md:w-[400px]">
              <h3 className="lg:text-wrap ">
                Confirmar tu asistencia es fundamental para mí Además, si tenés
                alguna restricción alimentaria por favor hacemelo saber
              </h3>
              <h3></h3>
            </div>
          </motion.div>
          <div className="relative"></div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.4,
              delay: 0.5,
            }}
          >
            <h2
              className="font-medium flex justify-center sm:text-xl text-lg text-white rounded-full p-4 sm:bg-amber-400 mt-2 sm:hover:bg-amber-300 bg-amber-300 transition duration-150 cursor-pointer"
              onClick={() => setShow(true)}
            >
              CONFIRMAR ASISTENCIA
            </h2>
          </motion.div>
        </div>

        {show && (
          <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full ">
            <div className="z-50 border border-slate-300 rounded-lg absolute bg-white p-6 max-sm:w-11/12">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 relative hover:bg-gray-50 rounded-lg cursor-pointer hover:text-amber-400 transition duration-75"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  onClick={() => setShow(false)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="px-4 py-6 space-y-4 ">
                <div className="flex justify-center pb-2">
                  <div className="text-center">
                    <h1 className="text-lg font-medium text-amber-400 ">
                      CONFIRMAR ASISTENCIA
                    </h1>
                  </div>
                </div>
                <form className=" " onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-4 text-sm font-medium text-black"
                    >
                      Nombre y Apellido
                    </label>
                    <div className="flex items-center mb-4">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5  focus:border-b-2 focus:border-solid focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent "
                        placeholder="Nombre y Apellido"
                      />
                    </div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mt-4 text-black"
                    >
                      ¿Asistís a la fiesta?
                    </label>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        checked={assist}
                        onChange={() => setAssist(true)}
                        type="checkbox"
                        name="asiste"
                        id="asiste"
                        className=" cursor-pointer appearance-none w-4 h-4 border rounded-sm focus:outline-none sm:text-sm mr-2  checked:bg-amber-300"
                      />
                      Si
                      <input
                        checked={!assist}
                        onChange={() => setAssist(false)}
                        type="checkbox"
                        name="assist"
                        id="assist"
                        className=" cursor-pointer  appearance-none w-4 h-4 border rounded-sm focus:outline-none sm:text-sm mr-2 ml-2  checked:bg-amber-300"
                      />
                      No
                    </div>

                    <label
                      htmlFor="name"
                      className="block mb-4 text-sm font-medium text-black"
                    >
                      incluí algún dato importante ej. (Soy celiaco, intolerante
                      a.., vegetariano, etc.)
                    </label>
                    <div className="flex items-center mb-4">
                      <input
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                        name="comments"
                        id="comments"
                        className=" sm:text-sm font-thin border-b border-slate-100  transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-amber-200  placeholder-slate-400 focus focus:outline-none bg-transparent "
                        placeholder="Comentarios"
                      />
                    </div>
                  </div>

                  <div className="flex items-center py-4">
                    <button
                      type="submit"
                      className="w-full font-medium text-white bg-amber-400 hover:bg-amber-300 text-sm px-5 py-2.5 text-center  col-start-2 transition duration-25 rounded-full"
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MainPage;
