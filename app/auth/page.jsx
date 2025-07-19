'use client'
import styles from './page.module.scss'
import { Header } from '@/app/_components/header';
import { useRef, useEffect, useState } from 'react';
import { Link } from "react-transition-progress/next";
import IMask from 'imask';

export default function Page() {
    const [step, setStep] = useState('phone');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(false);
    
    const phoneRef = useRef(null);
    const codeRef = useRef(null);
    const phoneMaskRef = useRef(null);

    useEffect(() => {
        if (phoneRef.current && step === 'phone') {
            const mask = IMask(phoneRef.current, {
                mask: '+{7} ({000}) {000} {00} {00}'
            });
            phoneMaskRef.current = mask;
            
            mask.on('accept', () => setError(''));
            if (phone) mask.value = phone;
            
            return () => {
                mask.destroy();
                phoneMaskRef.current = null;
            };
        }
    }, [step, phone]);

    useEffect(() => {
        if (codeRef.current && step === 'code') {
            codeRef.current.value = '';
            
            const mask = IMask(codeRef.current, {
                mask: '00 00'
            });
            
            mask.on('accept', () => {
                const codeValue = mask.value;
                setCode(codeValue);
                setError('');
                
                if (codeValue.replace(/\s/g, '').length === 4) {
                    if (codeValue === '01 23') {
                        setIsCodeValid(true);
                        setError('');
                    } else {
                        setIsCodeValid(false);
                        setError('Проверка кода не пройдена (корректный 0123)');
                    }
                } else {
                    setIsCodeValid(false);
                }
            });
            return () => mask.destroy();
        }
    }, [step]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const validatePhone = (phoneValue) => {
        const digitsOnly = phoneValue.replace(/\D/g, '');
        return digitsOnly.length === 11 && digitsOnly.startsWith('7');
    };

    const handleGetCode = () => {
        if (countdown > 0) return;
        
        const phoneValue = phoneMaskRef.current?.value || '';
        
        if (!validatePhone(phoneValue)) {
            setError('Введи корректный телефон');
            return;
        }
        
        setError('');
        setPhone(phoneValue);
        setCode('');
        setIsCodeValid(false);
        setStep('code');
        setCountdown(30);
    };

    const handleResendCode = () => {
        if (countdown === 0) {
            setCode('');
            setIsCodeValid(false);
            setError('');
            if (codeRef.current) {
                codeRef.current.value = '';
            }
            setCountdown(30);
        }
    };

    const handleChangeNumber = () => {
        setStep('phone');
        setCode('');
        setError('');
        setIsCodeValid(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isPhoneStep = step === 'phone';
    const isDisabled = countdown > 0;

    return (
        <>
            <Header title="Авторизация" />
            
            <div className={styles.container}>
                <div className={styles.title}>
                    {isPhoneStep ? 'Добро пожаловать!' : 'Код'}
                </div>
                
                <div className={styles.desc}>
                    {isPhoneStep ? (
                        <>Каждый день <span>Лепесток</span> выбирают десятки клиентов. Спасибо вам за это!</>
                    ) : (
                        <>
                            Введите код из СМС. Мы отправили его на номер{' '}
                            <span>{phone}</span>.{' '}
                            <a onClick={handleChangeNumber}>Изменить номер</a>
                        </>
                    )}
                </div>
                
                <div className={styles.form}>
                    <div className={styles.form_title}>
                        {isPhoneStep ? 'Телефон' : 'Введите код'}
                    </div>
                    
                    {isPhoneStep ? (
                        <input 
                            ref={phoneRef}
                            type="text" 
                            placeholder="+7 (ХХХ) ХХХ ХХ ХХ"
                            className={error ? styles.invalid : ''}
                        />
                    ) : (
                        <input 
                            ref={codeRef}
                            type="text" 
                            placeholder="ХХ ХХ"
                            className={error ? styles.invalid : ''}
                        />
                    )}
                </div>

                {error && (
                    <div className={styles.notify_container}>
                        <div className={styles.notify_warning}>
                            {error}
                        </div>
                    </div>
                )}
            </div>

            {isCodeValid ? (
                <Link href="/profile">
                    <div className={styles.confirm}>
                        Войти в профиль
                    </div>
                </Link>
            ) : (
                <div 
                    className={`${styles.confirm} ${isDisabled ? styles.confirm_disabled : ''}`}
                    onClick={isPhoneStep ? handleGetCode : handleResendCode}
                >
                    {isPhoneStep 
                        ? isDisabled 
                            ? `Отправить код через ${formatTime(countdown)}`
                            : 'Отправить код'
                        : isDisabled 
                            ? `Отправить код повторно через ${formatTime(countdown)}`
                            : 'Отправить код повторно'
                    }
                </div>
            )}
        </>
    );
}
