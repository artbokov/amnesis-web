import React from "react";
import { BlockedPage } from "../../components";
import { ReactComponent as VkIcon } from "../../assets/vkIcon.svg";
import classes from "./styles.module.scss";

const SupportPage = () => <BlockedPage blocks={blocks} />;

const questions = [
	{
		req: "Как пользоваться ботом?",
		res: "Правила пользования ботом описаны на главной странице",
	},
	{
		req: "Отвечает человек?",
		res: "Отвечает бот, но текст текст текст текст текст текст текст текст текст текст текст",
	},
	{
		req: "Ещё вопрос?",
		res: "Ещё ответ текст текст текст текст",
	},
	{
		req: "Ещё вопрос?",
		res: "Ещё ответ текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
	},
];

const blocks = [
	{
		id: "questions",
		classname: classes.questions,
		title: <span className={classes.title}>Часто задаваемые вопросы</span>,
		subblocks: [
			<>
				{questions.map((question, index) => (
					<React.Fragment key={index}>
						<div className={classes.questionTitle}>{`${index + 1}. ${
							question.req
						}`}</div>
						{question.res}
					</React.Fragment>
				))}
			</>,
		],
	},
	{
		id: "contacts",
		classname: classes.contacts,
		title: <span>Контакты</span>,
		subblocks: [
			<div key={"contacts"} className={classes.contactsData}>
				<div className={classes.col}>
					<span> +7 (999) 999-99-99 — телефон горячей линии </span>
					<span>
						<span className={classes.blue}> example@ex.com </span> — почта для
						вопросов
					</span>
				</div>
				<div className={classes.col}>
					<span>
						<VkIcon /> - мы в ВКонтакте
					</span>
				</div>
			</div>,
		],
	},
];

export default SupportPage;
