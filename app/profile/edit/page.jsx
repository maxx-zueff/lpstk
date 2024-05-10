'use client'

import Image from 'next/image'
import styles from './page.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import IMask from 'imask';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { DatePicker, ConfigProvider } from 'antd';
import ru from 'antd/locale/ru_RU';
import { Header } from '@/app/_components/header';
// import 'react-day-picker/dist/style.css';

export function Profile() {
	return (
		<div className={styles.profile_container}>
			<div>
				<div className={styles.profile_avatar_container}>
					<Image
						src="/avatar.jpg"
						width={100}
						height={100}
						alt="Avatar"
						className={styles.profile_avatar}
					/>
					{/* <Image
						src="/paint.png"
						width={30}
						height={30}
						alt="Avatar"
						className={styles.profile_avatar_edit}
					/> */}
				</div>
				<h1>Максим</h1>
			</div>	
		</div>
	)
}

export function Form() {
	useEffect(() => {
		// Маска для имени
		IMask(document.getElementById('name'), {
		  mask: /^[a-zA-Zа-яА-ЯёЁ]{0,15}$/
		});
	
		// Маска для телефона
		IMask(document.getElementById('phone'), {
		  mask: '+{7} ({000}) {000} {00} {00}',
		});

	  }, []);

	  const GenderModal = ({ isOpen, onRequestClose, onGenderSelect }) => {
		return (
		  <Modal isOpen={isOpen} onRequestClose={onRequestClose}  onClick={(e) => e.stopPropagation()} className={styles.optionModalContent}>
				<h1>Выберите ваш пол</h1>
				<div className={styles.btn} onClick={() => onGenderSelect('male')}>Мужской</div>
				<div className={styles.btn} onClick={() => onGenderSelect('female')}>Женский</div>
		  </Modal>
		);
	  };

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
	const [gender, setGender] = useState('');

	const handleGenderSelect = (selectedGender) => {
		setGender(selectedGender);
		setIsGenderModalOpen(false);
	};

	return(
		<div className={styles.form_container}>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Имя</div>
					<input id="name" type="text" placeholder="Ваше имя"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Телефон</div>
					<input id="phone" type="text" placeholder="Ваш телефон"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Дата рождения</div>
					<ConfigProvider locale={ru}>
                            <DatePicker className={styles.select_container_a} locale={ru} placeholder="Дата рождения" onChange={(date) => {
								setSelectedDate(date);
								setIsDatePickerOpen(false);
							}}

                            />
					</ConfigProvider>		
						{/* <Image  src="/calendar.png" alt="Календарь" width={20} height={20} /> */}
				</div>	
				<div className={styles.form_col}>
					<div className={styles.form_title}>Пол</div>
					<div className={styles.select_container} onClick={() => setIsGenderModalOpen(true)}>
						{gender === 'male' ? 'Мужской' : 'Женский'}
					</div>
					<GenderModal
						isOpen={isGenderModalOpen}
						onRequestClose={() => setIsGenderModalOpen(false)}
						onGenderSelect={handleGenderSelect}
					/>
				</div>	
			</div>
		</div>
	)
}

export default function Page() {
  return (
    <div className={styles.page_container}>
	    <div>
			<Header title={"Редактировать профиль"}/>
		    <Profile />
		    <Form />
			<div className={styles.confirm}>
				Внести изменения
			</div>
		</div>
    </div>
  )
}