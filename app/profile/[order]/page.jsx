"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import classNames from "classnames";
import { Header } from "@/app/_components/header";
import { useState } from "react";
import { Link } from "react-transition-progress/next";

function Progress({ currentStep = 3 }) {
  const steps = [
    { label: "Принятие", align: "left" },
    { label: "Сборка", align: "center" },
    { label: "Доставка", align: "center" },
    { label: "Готово", align: "right" },
  ];

  const isLastStep = currentStep === steps.length;
  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

  return (
    <div className={styles.progress}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete =
          stepNumber < currentStep ||
          (isLastStep && stepNumber === currentStep);
        const isActive = stepNumber === currentStep && !isLastStep;

        return (
          <div
            key={stepNumber}
            className={classNames(styles.progress_point, {
              [styles.progress_point_complete]: isComplete,
              [styles.progress_point_active]: isActive,
            })}
          >
            {isComplete ? (
              <Image src="/done2.svg" width={10} height={10} alt="Complete" />
            ) : (
              <span>{stepNumber}</span>
            )}
            <div
              className={styles.progress_point_label}
              style={
                step.align === "left"
                  ? { left: 0 }
                  : step.align === "right"
                  ? { right: 0 }
                  : {}
              }
            >
              {step.label}
            </div>
          </div>
        );
      })}

      <div className={styles.progress_bar}>
        <div
          className={styles.progress_bar_indicator}
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
}

function Photo({ currentStep }) {
  const [rating, setRating] = useState(null);

  const handleRating = (type) => {
    const newRating = rating === type ? null : type;
    setRating(newRating);
    sendRatingToServer(newRating);
  };

  const sendRatingToServer = async (ratingValue) => {
    try {
      const ratingData = {
        orderId: "000031", // можно получить из параметров роута
        photoRating: ratingValue, // 'like', 'dislike' или null
        timestamp: new Date().toISOString(),
        type: "photo_rating",
      };

      // Раскомментируйте когда будет готов API endpoint
      /*
      const response = await fetch('/api/orders/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });
      
      if (response.ok) {
        console.log('Rating sent successfully');
      } else {
        console.error('Failed to send rating');
      }
      */
    } catch (error) {
      console.error("Error sending rating to server:", error);
    }
  };

  // Показываем заглушку для этапа "Сборка" (currentStep === 2)
  if (currentStep === 2) {
    return (
      <div className={styles.photo}>
        <div className={styles.photo_title}>Фото до доставки</div>
        <div className={styles.photo_placeholder}>
          Скоро загрузим фото вашего букета
        </div>
      </div>
    );
  }

  return (
    <div className={styles.photo}>
      <div className={styles.photo_title}>Фото до доставки</div>
      <Image src="/before.png" fill alt="Фото букета до доставки" />
      <div className={styles.photo_rate}>
        {["dislike", "like"].map((type) => (
          <Image
            key={type}
            src={rating === type ? "/like-active.svg" : "/like.svg"}
            width={50}
            height={50}
            alt={type === "like" ? "Нравится" : "Не нравится"}
            onClick={() => handleRating(type)}
            className={classNames({
              [styles.photo_rate_active]: rating === type,
            })}
            style={type === "dislike" ? { transform: "rotate(180deg)" } : {}}
          />
        ))}
      </div>
    </div>
  );
}



function Order({ currentStep, needsClarification }) {
  const orderItems = [
    {
      title: "Милан",
      quantity: 1,
      price: 4996,
      description: "Авторский букет",
    },
    {
      title: "Подкормка для цветов",
      quantity: 2,
      price: 500,
      description: "Прочее",
    },
  ];

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isCompleted = currentStep === 4; // Этап "Готово"
  const showClarification = currentStep === 1 && needsClarification;

  return (
    <div className={styles.order}>
      <div className={styles.order_header}>
        <div className={styles.order_header_title}>Ваш заказ</div>
        {isCompleted && (
          <div className={styles.order_header_repeat}>
            <Image src="/refresh.svg" width={15} height={15} alt="refresh" />
            <span>Повторить заказ</span>
          </div>
        )}
      </div>

      <div className={styles.order_list}>
        {orderItems.map((item, index) => (
          <div key={index} className={styles.order_item}>
            <div className={styles.order_item_main}>
              <div className={styles.order_item_title}>{item.title}</div>
              <div className={styles.order_item_point}></div>
              <div>{`${item.quantity}шт`}</div>
            </div>
            <div className={styles.order_item_description}>
              {item.description}
            </div>
          </div>
        ))}
        <div className={styles.order_line}></div>
        <div className={styles.order_total}>
          <span>Сумма заказа</span>
          <span>
            {showClarification
              ? "Зависит от способа вручения"
              : `${totalAmount} ₽`}
          </span>
        </div>
      </div>
    </div>
  );
}

function Detail({ currentStep, needsClarification }) {
  const detailItems = [
    {
      title: "Доставка по адресу",
      content: "г. Москва, ул. Пушкина, д. 1",
      clarificationText: "Уточняем",
    },
    {
      title: "Квартира / Подъезд / Этаж",
      content: "107 / - / -",
      clarificationText: "Уточняем",
    },
    {
      title: "Дата и время вручения",
      content: ["01/01/2024", "20:30-21:00"],
      clarificationText: "Уточняем",
    },
  ];

  const showEditButton = currentStep === 1 || currentStep === 2;
  const showClarification = currentStep === 1 && needsClarification;

  return (
    <div className={styles.detail}>
      <div className={styles.detail_header}>
        <div className={styles.detail_header_title}>Детали вручения</div>
        {showEditButton && (
          <Link href="/delivery">
            <div className={styles.detail_header_edit}>Изменить</div>
          </Link>
        )}
      </div>

      <div className={styles.detail_list}>
        {detailItems.map((item, index) => (
          <div key={index}>
            <div className={styles.detail_item}>
              <div className={styles.detail_item_title}>{item.title}</div>
              <div className={styles.detail_item_main}>
                {showClarification ? (
                  item.clarificationText
                ) : Array.isArray(item.content) ? (
                  <>
                    {item.content[0]}
                    <div className={styles.detail_item_point}></div>
                    {item.content[1]}
                  </>
                ) : (
                  item.content
                )}
              </div>
            </div>
            {index < detailItems.length - 1 && (
              <div className={styles.detail_line}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (starValue) => {
    if (!isSubmitted) {
      setRating(starValue);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const handleKeyDown = (e) => {
    // Запрещаем Enter (перенос строки)
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const canSubmit = rating > 0 && comment.trim().length > 0 && !isSubmitted;

  return (
    <div className={styles.feedback}>
      <div className={styles.feedback_title}>Ваш отзыв</div>
      <div className={!isSubmitted ? styles.feedback_rate_set : styles.feedback_rate}>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              src={star <= rating ? "/star.png" : "/star-empty.png"}
              width={!isSubmitted ? 25 : 15}
              height={!isSubmitted ? 25 : 15}
              alt="Star"
              className={styles.feedback_star}
              onClick={() => handleStarClick(star)}
              style={{ cursor: isSubmitted ? 'default' : 'pointer' }}
            />
          ))}
        </div>
        {isSubmitted && (
          <div className={styles.feedback_edit} onClick={handleEdit}>
            Изменить
          </div>
        )}
      </div>
      {isSubmitted ? (
        <div className={styles.feedback_submit}>
          {comment}
        </div>
      ) : (
        <textarea
          name="feedbackComment"
          maxLength="120"
          className={styles.feedback_comment}
          placeholder="Оставьте пожалуйста ваш отзыв"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
      {canSubmit && (
        <div className={styles.confirm} onClick={handleSubmit}>
          Оставить отзыв
        </div>
      )}
    </div>
  );
}







function Help() {
  return (
    <Link href="/profile/help">
    <div className={styles.help}>
      <Image
        src="/chat.png"
        width={15}
        height={15}
        alt="Chat"
        className={styles.help_icon}
      />
      Задать вопрос по заказу
    </div>
    </Link>
  );
}

export function Confirm() {
  return (
    <Link href="/pay">
      <div className={styles.confirm}>Оплатить заказ</div>
    </Link>
  );
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState(4); // Можно изменить для тестирования разных этапов
  const [needsClarification, setNeedsClarification] = useState(false); // Новый state для уточнения деталей

  const showConfirm = currentStep === 1;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Принятие
        return (
          <>
            <Order
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Detail
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            {showConfirm && <Confirm />}
            <Help />
          </>
        );

      case 2: // Сборка
        return (
          <>
            <Photo currentStep={currentStep} />
            <Order
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Detail
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Help />
          </>
        );

      case 3: // Доставка
        return (
          <>
            <Photo currentStep={currentStep} />
            <Order
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Detail
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Help />
          </>
        );

      case 4: // Готово
        return (
          <>
            <Photo currentStep={currentStep} />
            <Order
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Detail
              currentStep={currentStep}
              needsClarification={needsClarification}
            />
            <Feedback />
            <Help />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ paddingBottom: showConfirm ? "60px" : "0" }}>
      <Header title={"Заказ 000031"} />
      <Progress currentStep={currentStep} />
      {renderStepContent()}
    </div>
  );
}
