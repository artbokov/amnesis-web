import classes from "./styles.module.scss";
import { BlockedPage, CustomLink } from "../../components";
import { ReactComponent as HowItWorksScheme } from "../../assets/sheme.svg";

const InfoPage = () => <BlockedPage blocks={blocks} />;

const GuideExampleTable = () => {
	return (
		<>
			Пример работы системы:
			<table>
				<tbody>
					<tr>
						<td>Линия лечения</td>
						<td>1</td>
					</tr>
					<tr>
						<td>Менопауза</td>
						<td>Постменопауза</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const blocks = [
	{
		id: "summary",
		classname: classes.summary,
		title: (
			<>
				Ana<span>VIT</span>
			</>
		),

		subblocks: [
			<span key={"summary_1"}>
				AnaVIT (Anamnaesis Vitae) - это комплексная технология, упрощающая
				взаимодействие врач - пациент благодаря возможности самопроверки для
				врача и контроля назначения со стороны пациента. Простота использования
				обусловлена автоматизированным поиском по тексту анамнеза с возможностью
				ручной корректировки найденных текстовых маркёров. Далее, используя
				найденные данные, алгоритм, работающий по принципу дерева принятия
				решений, назначает наиболее релевантую для пациента терапию. Назначение
				терапии базируется на рекомендациях Министерства Здравоохранения РФ.
			</span>,
			<CustomLink
				key={"summary_2"}
				text="Перейти к чату"
				navigateTo="/chat"
				isActive={true}
			/>,
		],
	},
	{
		id: "guide",
		classname: classes.guide,
		title: <span> Как пользоваться чатом? </span>,

		subblocks: [
			{
				align: "left",
				content: "Открыть чат по кнопке выше или по кнопке в меню",
			},
			{ align: "left", content: "Прикрепить документ с историей болезни" },
			{
				align: "right",
				content:
					"Автоматическая система предоставит таблицу текстовых маркеров, найденных методом анализирования текста",
			},
			{ align: "right", content: <GuideExampleTable /> },
			{
				align: "left",
				content:
					"Далее вы можете отредактировать ваше сообщение или подтветить информацию, выведенную системой. При редактировании вам нужно указать, какой конкретно параметр вы хотите изменить, и написать корректное значение",
			},
			{
				align: "right",
				content:
					"При успешном согласовании всех параметров система предложит наиболее релевантную терапию",
			},
		].map((data: { align: string; content: any }, index: number) => (
			<div
				key={`guide_${index}`}
				className={`${classes.step} ${classes[data.align]}`}
			>
				<div className={classes.path} />
				<div className={classes.mainPath} />
				<div className={classes.content}>{data.content}</div>
			</div>
		)),
	},
	{
		id: "howItWorks",
		classname: classes.howItWorks,
		title: <span> Как это работает? </span>,

		subblocks: [<HowItWorksScheme key={"howItWorks_1"} />],
	},
];

export default InfoPage;
