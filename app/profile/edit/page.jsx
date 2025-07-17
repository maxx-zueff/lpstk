"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { Link } from "react-transition-progress/next";
import IMask from "imask";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { DatePicker, ConfigProvider } from "antd";
import ru from "antd/locale/ru_RU";
import { Header } from "@/app/_components/header";
// import 'react-day-picker/dist/style.css';

export function Profile() {
  return (
    <div className={styles.profile}>
      <Image
        src="/avatar.jpg"
        width={200}
        height={200}
        alt="Avatar"
      />
      <h1>Максим</h1>
    </div>
  );
}


export function Form() {
  useEffect(() => {
    // Маска для имени
    IMask(document.getElementById("name"), {
      mask: /^[a-zA-Zа-яА-ЯёЁ]{0,15}$/,
    });

    // Маска для телефона
    IMask(document.getElementById("phone"), {
      mask: "+{7} ({000}) {000} {00} {00}",
    });
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleNameChange = (event) => {
    setName(capitalizeFirstLetter(event.target.value));
  };

  const GenderModal = ({ isOpen, onRequestClose, onGenderSelect }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onClick={(e) => e.stopPropagation()}
        className={styles.optionModalContent}
      >
        <h1>Выберите ваш пол</h1>
        <div className={styles.btn} onClick={() => onGenderSelect("male")}>
          Мужской
        </div>
        <div className={styles.btn} onClick={() => onGenderSelect("female")}>
          Женский
        </div>
      </Modal>
    );
  };

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsGenderModalOpen(false);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_row}>
        <div className={styles.form_col}>
          <div className={styles.form_title}>Имя</div>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Ваше имя"
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.form_col}>
          <div className={styles.form_title}>Телефон</div>
          <input id="phone" type="text" placeholder="Ваш телефон" />
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.form_col}>
          <div className={styles.form_title}>Дата рождения</div>
          <ConfigProvider locale={ru}>
            <DatePicker
              className={styles.select_container_a}
              locale={ru}
              placeholder="Дата рождения"
              onChange={(date) => {
                setSelectedDate(date);
                setIsDatePickerOpen(false);
              }}
            />
          </ConfigProvider>
          {/* <Image  src="/calendar.png" alt="Календарь" width={20} height={20} /> */}
        </div>
        <div className={styles.form_col}>
          <div className={styles.form_title}>Пол</div>
          <div
            className={styles.select_container}
            onClick={() => setIsGenderModalOpen(true)}
          >
            {gender === "male" ? "Мужской" : "Женский"}
          </div>
          <GenderModal
            isOpen={isGenderModalOpen}
            onRequestClose={() => setIsGenderModalOpen(false)}
            onGenderSelect={handleGenderSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className={styles.page}>
        <Header title={"Редактировать профиль"} />
        <div>
        <Profile />
        <Form />
        
        </div>
        <div className={styles.confirm}>Внести изменения</div>
    </div>
  );
}
