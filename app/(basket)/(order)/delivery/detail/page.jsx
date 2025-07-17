"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";
import { Link } from "react-transition-progress/next";
import IMask from "imask";
import { init, getAddress } from "@/app/_lib/delivery.js";
import { formField } from "@/app/_data";
import { DatePicker, TimePicker, ConfigProvider } from "antd";
import ru from "antd/locale/ru_RU";
import dayjs from "dayjs";
const timeFormat = "HH:mm";

export function Option({ item }) {
  return (
    <div className={styles.option_container}>
      <Image
        src={item.img}
        alt={item.title}
        width={20}
        height={20}
        className={styles.title_image}
      />

      <div key={item.title} className={styles.option_item}>
        <div className={styles.option_title}>{item.title}</div>
        {item.free && <div className={styles.free}>бесплатно</div>}
        <div className={styles.option_description}>{item.description}</div>
      </div>
    </div>
  );
}

export function Form({
  fields,
  setDeliveryPrice,
  setAddressValid,
  setPhoneValid,
  setCalculatedTime,
  packingTime,
  setAddressTouched,
  setPhoneTouched
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [minDate, setMinDate] = useState(dayjs());
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timePickerValue, setTimePickerValue] = useState(null);

  const refs = {
    phone: useRef(null),
    apart: useRef(null),
    entrance: useRef(null),
    level: useRef(null),
    address: useRef(null),
  };

  useEffect(() => {
    initializeMasks();
    updateMinDate();
  }, [selectedDate]);

  useEffect(() => {
    calculateTime();
  }, [timePickerValue, deliveryTime]);

  useEffect(() => {
    setTimePickerValue("");
  }, [selectedDate]);

  const initializeMasks = () => {
    const masks = [
      { ref: refs.phone, mask: "+{7} ({000}) {000} {00} {00}" },
      { ref: refs.apart, mask: Number, min: 1, max: 999 },
      { ref: refs.entrance, mask: Number, min: 1, max: 99 },
      { ref: refs.level, mask: Number, min: 1, max: 99 },
    ];

    masks.forEach(({ ref, mask, min, max }) => {
      if (ref.current) IMask(ref.current, { mask, min, max });
    });
  };

  const updateMinDate = () => {
    const totalMinutes = packingTime + fields.delivery_range;
    const futureTime = dayjs().add(totalMinutes, "minute");
    const isLate =
      futureTime.hour() >= 21 || dayjs().hour() > futureTime.hour();
    const newMinDate = isLate ? dayjs().add(1, "day") : futureTime;
    setMinDate(newMinDate);
  };

  const calculateTime = () => {
    const deliveryRange = fields.delivery_range;
    const type = fields.type;
    const currentTime = dayjs();

    if (type === "urgent") {
      const startTime = currentTime.add(packingTime + deliveryTime, "minute");
      if (startTime.hour() >= 21) {
        setCalculatedTime(null);
        return;
      }
      const endTime = startTime.add(deliveryRange, "minute");
      setCalculatedTime({
        start: startTime.format("HH:mm"),
        end: endTime.format("HH:mm"),
      });
    } else {
      if (!timePickerValue) {
        setCalculatedTime(null);
        return;
      }
      const startTime = dayjs(timePickerValue);
      const endTime = startTime.add(deliveryRange, "minute");
      setCalculatedTime({
        start: startTime.format("HH:mm"),
        end: endTime.format("HH:mm"),
      });
    }
  };

  const updateAddressInvalid = () => {
    refs.address.current.classList.add(styles.form_input_invalid);
    setSelectedAddress(false);
    setAddressValid(false);
  };

  const updateAddressValid = (suggestion) => {
    setSelectedAddress(suggestion);
    refs.address.current.classList.remove(styles.form_input_invalid);
    setAddressValid(true);
  };

  const updateDeliveryInfo = (response) => {
    setDeliveryPrice(response.distance < 6500 ? 0 : response.price);
    setDeliveryTime(response.eta);
  };

  const handlePhoneValidation = (event) => {
    const isValid = refs.phone.current.value.length === 18;
    setPhoneTouched(true);
    setPhoneValid(isValid);
    if (event.type !== "input") {
      if (!isValid) {
        refs.phone.current.classList.add(styles.form_input_invalid);
      } else {
        refs.phone.current.classList.remove(styles.form_input_invalid);
      }
    }
  };

  const handleAddressInput = async () => {
    const addressValue = refs.address.current.value;
    const suggestions = await getAddress(addressValue);
    setAddressTouched(true);
    setSuggestions(suggestions);
    setSelectedAddress(
      addressValue !== selectedAddress ? false : selectedAddress
    );
  };

  const handleAddressBlur = () => {
    if (!selectedAddress) {
      updateAddressInvalid();
    }
    setTimeout(() => setSuggestions([]), 100);
  };

  const handleSuggestionClick = async (suggestion) => {
    refs.address.current.value = suggestion.value;
    setSuggestions([]);
    if (suggestion.house === null) {
      updateAddressInvalid();
    } else {
      updateAddressValid(suggestion.value);
      const response = await init(suggestion.value);
      updateDeliveryInfo(response);
    }
  };

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDateTime() {
    if (!selectedDate) {
      return {
        disabledHours: () => range(0, 24),
        disabledMinutes: () => range(0, 60),
      };
    }

    const currentDay = dayjs();
    const selectedDay = dayjs(selectedDate);

    const isToday = selectedDay.isSame(currentDay, "day");
    const isWeekday = selectedDay.day() >= 1 && selectedDay.day() <= 5;

    const activeDay = isToday
      ? currentDay
      : selectedDay.hour(isWeekday ? 8 : 9);

    const { startHour, startMinute } = adjustTime(activeDay);

    return {
      disabledHours: () => [...range(0, startHour), 22, 23, 24],
      disabledMinutes: (hour) => {
        if (hour === 21) return range(1, 60);
        if (hour === startHour) return range(0, startMinute);
        return [];
      },
    };
  }

  function adjustTime(currentDate) {
    const totalMinutes = packingTime + fields.delivery_range;
    const updatedDate = currentDate.add(totalMinutes, "minute");

    let startHour = updatedDate.hour();
    let startMinute = updatedDate.minute();

    if (startMinute > 45) {
      startMinute = 0;
      startHour += 1;
    }

    return { startHour, startMinute };
  }

  const CalendarImg = (
    <Image src="/calendar.png" alt="Календарь" width={20} height={20} />
  );

  const ClockImg = (
    <Image src="/clock.png" alt="Календарь" width={20} height={20} />
  );

  return (
    <div className={styles.form_container}>
      {fields.adress && (
        <div>
          <div className={styles.form_row}>
              <div className={styles.form_col}>
                <div className={styles.form_title}>
                  Адрес <span className={styles.form_title_required}>*</span>
                </div>
                <input
                  ref={refs.address}
                  onBlur={handleAddressBlur}
                  onFocus={handleAddressInput}
                  onInput={handleAddressInput}
                  type="text"
                  placeholder="ул. Пушкина, д. 1"
                  className={styles.form_input}
                />
                {suggestions.length > 0 && (
                  <ul className={styles.suggestions_list}>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </div>
          <div className={styles.form_row}>
            <div className={styles.form_col}>
              <div className={styles.form_title}>Квартира</div>
              <input ref={refs.apart} type="text" placeholder="кв." className={styles.form_input} />
            </div>
            <div className={styles.form_col}>
              <div className={styles.form_title}>Подъезд</div>
              <input ref={refs.entrance} type="text" placeholder="под." className={styles.form_input} />
            </div>
            <div className={styles.form_col}>
              <div className={styles.form_title}>Этаж</div>
              <input ref={refs.level} type="text" placeholder="эт." className={styles.form_input} />
            </div>
          </div>
        </div>
      )}
      {fields.phone && (
        <div className={styles.form_row}>
          <div className={styles.form_col}>
            <div className={styles.form_title}>
              Телефон получателя <span className={styles.form_title_required}>*</span>
            </div>
            <input
              ref={refs.phone}
              type="text"
              placeholder="+7 (999) 999 99 99"
              onBlur={(e) => handlePhoneValidation(e)}
              onInput={(e) => handlePhoneValidation(e)}
              className={styles.form_input}
            />
          </div>
        </div>
      )}

      {fields.comment && (
        <div className={styles.form_row}>
          <div className={styles.form_col}>
            <div className={styles.form_title}>Дополнительная информация</div>
            <textarea
              maxLength="120"
              className={styles.form_input_comment}
              type="text"
              placeholder="Уточнения для курьера"
            />
          </div>
        </div>
      )}
      {fields.date && (
        <ConfigProvider
          locale={ru}
          theme={{
            components: {
              DatePicker: {
                activeBorderColor: "#59adff",
                activeShadow: "0 0 0 2px rgba(89, 172, 255, 0.2)",
              },
              TimePicker: {
                activeBorderColor: "#59adff",
                activeShadow: "0 0 0 2px rgba(89, 172, 255, 0.2)",
              },
            },
          }}
        >
          <div className={styles.form_row}>
            <div className={styles.form_col}>
              <div className={styles.form_title}>
                Дата <span className={styles.form_title_required}>*</span>
              </div>

              <DatePicker
                className={styles.form_input}
                locale={ru}
                placeholder="Дата"
                suffixIcon={CalendarImg}
                format="DD/MM/YYYY"
                minDate={minDate}
                maxDate={dayjs(minDate).add(9, "day")}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
              />
            </div>
            <div className={styles.form_col}>
              <div className={styles.form_title}>
                Время <span className={styles.form_title_required}>*</span>
              </div>
              <TimePicker
                value={timePickerValue}
                onChange={(time) => {
                  setTimePickerValue(time);
                }}
                disabledTime={disabledDateTime}
                minuteStep={15}
                showNow={false}
                needConfirm={false}
                placeholder="Время"
                className={styles.form_input}
                format={timeFormat}
                suffixIcon={ClockImg}
              />
            </div>
          </div>
        </ConfigProvider>
      )}
    </div>
  );
}

export function Notify({
  deliveryPrice,
  deliveryOption,
  timeValid,
  addressValid,
  phoneValid,
  addressTouched,
  phoneTouched
}) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifyContent());
  }, [deliveryPrice, timeValid, addressValid, phoneValid]);

  const getNotifyContent = () => {
    let notifications = [];

    if (!addressValid && addressTouched)
      notifications.push({
        content: "Введите адрес доставки",
        isWarning: true,
      });
      if (!phoneValid && phoneTouched)
      notifications.push({
        content: "Введите телефон получателя",
        isWarning: true,
      });
    if (!timeValid && deliveryOption.type === "urgent") {
      notifications.push({
        content: "Сегодня уже поздно для этого варианта вручения",
        isWarning: true,
      });
    }

    if (timeValid) {
      notifications.push({
        content: `Время доставки: ${timeValid.start} - ${timeValid.end}`,
        isWarning: false,
      });
    }

    if (addressValid && deliveryPrice !== null) {
      notifications.push({
        content:
          deliveryPrice === 0
            ? "Доставка на этот адрес бесплатна!"
            : `Стоимость доставки: ${deliveryPrice} ₽`,
        isWarning: false,
      });
    }

    return notifications;
  };

  return (
    <div className={styles.notify_container}>
      {notifications.map((notification, index) => (
        <div
          key={`${index}-${notification.content}`}
          className={`${styles.notify} ${
            notification.isWarning ? styles.notify_warning : ""
          }`}
        >
          {notification.content}
        </div>
      ))}
    </div>
  );
}

export function Confirm({ addressValid, phoneValid, selected, timeValid }) {
  const requiredFields = formField[selected.type].required;
  const isFormComplete = requiredFields.every((field) => {
    if (field === "date" && !timeValid) return false;
    if (field === "phone" && !phoneValid) return false;
    if (field === "address" && !addressValid) return false;
    return true;
  });

  if (!isFormComplete) {
    return (
      <div className={styles.confirm_disabled}>К оплате</div>
    );
  }

  return (
    <Link href="/pay">
      <div className={styles.confirm}>К оплате</div>
    </Link>
  );
}

export default function Page() {
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [phoneValid, setPhoneValid] = useState(null);
  const [addressValid, setAddressValid] = useState(null);
  const [calculatedTime, setCalculatedTime] = useState(null);
  const [addressTouched, setAddressTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const packingTime = 30;
  const selected = formField.date;

  return (
    <div className={styles.wrapper}>
      <Header title={"Оформление заказа"} />
      <Option item={selected} />
      <Notify
        deliveryPrice={deliveryPrice}
        deliveryOption={selected}
        timeValid={calculatedTime}
        addressValid={addressValid}
        phoneValid={phoneValid}
        addressTouched={addressTouched}
        phoneTouched={phoneTouched}
      />
      <Form
        packingTime={packingTime}
        fields={selected}
        setDeliveryPrice={setDeliveryPrice}
        setAddressValid={setAddressValid}
        setPhoneValid={setPhoneValid}
        setCalculatedTime={setCalculatedTime}
        setAddressTouched={setAddressTouched}
        setPhoneTouched={setPhoneTouched}
      />
      <Confirm
        addressValid={addressValid}
        phoneValid={phoneValid}
        timeValid={calculatedTime}
        selected={selected}
      />
    </div>
  );
}
