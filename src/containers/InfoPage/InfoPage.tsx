import classes from "./styles.module.scss";
import { BlockedPage, NavigationLink as Link } from "../../components";
import { ReactComponent as HowItWorksScheme } from "../../assets/sheme.svg";

const InfoPage = () => <BlockedPage blocks={blocks} />;
console.log(classes);
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
      <Link
        key={"summary_2"}
        optionalStyles={["bg-red", "round"]}
        width={200}
        text="Перейти к чату"
        navigateTo="/chat"
      />,
    ],
  },
  {
    id: "guide",
    classname: classes.guide,
    title: (
      <span className={classes["text-attention"]}>Как пользоваться чатом?</span>
    ),

    subblocks: [
      <ol>
        <li>Открыть чат по кнопке выше или по кнопке в меню</li>
        <li>Прикрепить документ с историей болезни</li>
        <li>
          Автоматическая система предоставит таблицу текстовых маркеров,
          найденных методом анлизирования текста
        </li>
        <li>
          Далее вы можете отредактировать ваше сообщение или подтветить
          информацию, выведенную системой. При редактировании вам нужно указать,
          какой конкретно параметр вы хотите изменить, и написать корректное
          значение
        </li>
        <li>
          При успешном согласовании всех парметров система предложит наиболее
          релевантную терапию
        </li>
      </ol>,
    ],
  },
  {
    id: "howItWorks",
    classname: classes.howItWorks,
    title: (
      <span className={classes["text-attention"]}> Как это работает? </span>
    ),

    subblocks: [<HowItWorksScheme key={"howItWorks_1"} />],
  },
];

export default InfoPage;
