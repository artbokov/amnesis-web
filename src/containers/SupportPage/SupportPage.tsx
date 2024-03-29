import React from "react";
import { BlockedPage } from "../../components";
// import { ReactComponent as VkIcon } from "../../assets/vkIcon.svg";
import classes from "./styles.module.scss";

const SupportPage = () => <BlockedPage blocks={blocks} />;

const questions = [
    {
        req: "Как пользоваться ботом?",
        res: [
            //   "Необходимо в строке Сообщения ввести либо «/test-example» - подобрать тестовый пример анамнеза, либо «/help» - вывести сообщение с инструкцией",
            //   "Поскольку бот -это пилотная версия окончательного приложения для работы онкомаммологов, то происходит подбор тестового анамнеза.",
            //   "Затем необходимо нажать кнопку «Продолжить», чтобы запустить анализ. Или нажать кнопку «Отмена» для прерывания работы программы, или нажать кнопку «Другой анамнез», чтобы выбрать другой анамнез.При нажатии кнопки «Продолжить» будет выводиться таблица найденных текстовых маркёров необходимых для определения тактики лечения и наиболее релевантная терапия, подобранная на основе данных анамнеза пациента.",
            "Some text here",
        ],
    },
    {
        req: "На чём базируется назначение терапии? ",
        res: [
            "Терапия назначается в соотвествии с действующими клиническими рекомендациями принятыми Министерством Здравоохранения.",
        ],
    },
    {
        req: "Какие условия конфиденциальности?",
        res: [
            "Тестовый анамнез, выгруженный пациентом автоматически анонимизируется. Другие пользователи не могут просматривать историю сообщений и файлы прикреплённые пациентом. ",
        ],
    },
];

const blocks = [
    {
        id: "questions",
        classname: classes.questions,
        title: (
            <span className={`${classes.title} ${classes["text-attention"]}`}>
                Часто задаваемые вопросы
            </span>
        ),
        subblocks: [
            <>
                {questions.map((question, index) => (
                    <React.Fragment key={index}>
                        <div className={classes.questionTitle}>{`${
                            index + 1
                        }. ${question.req}`}</div>
                        &emsp;
                        {question.res.map((line) => (
                            <>
                                {line} <br />
                            </>
                        ))}
                    </React.Fragment>
                ))}
            </>,
        ],
    },
];

export default SupportPage;
