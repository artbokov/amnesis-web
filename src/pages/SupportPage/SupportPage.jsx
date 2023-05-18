import React from "react";
import { BlockedPage } from "../../components";
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
		subblocks: [],
	},
];

export default SupportPage;
