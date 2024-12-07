import React, { useEffect, useState } from "react";
import moment from "jalali-moment";

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنج شنبه",
  "جمعه"
];

const yearMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const PersianDate = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    let m = moment();
    let finalDate = `${weekDays[m.jDay()]} ${m.jDate()} ${
      yearMonths[m.jMonth()]
    } ماه ${m.jYear()}`;
    setDate(finalDate);
    setTime(m.format("HH:mm"));
  }, []);

  return (
    <>
      <div className="mb-3 text-center">{date}</div>
      <div className="text-center">ساعت {time}</div>
    </>
  );
};

export default PersianDate;
