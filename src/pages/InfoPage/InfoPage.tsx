import classes from "./styles.module.scss";
import Block from "./Block/Block";

const InfoPage = () => {
  return (
    <div className={classes.wrapper}>
      {blocks.map(block => <Block {...block} />)}
    </div>
  );
};

const renderSummarySubblock = (text: string, index: number) => <span key={index}> {text} </span>;
const renderGuideSubblock = (
  text: string,
  index: number,
) =>
  <div className={`${classes.step} ${classes[index % 2 ? "left" : "right"]}`}>
    <div className={classes.path} />
    <div className={classes.mainPath} />
    <div className={classes.text}>{text}</div>
  </div>;

const blocks = [
  // Summary
  {
    classname: classes.info,
    title: <>Ana<span className={classes.green}>VIT</span> - онкоаналитика</>,
    renderSubblock: renderSummarySubblock,

    subblocksData: [
      "Мы - текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
      "Для того чтобы воспользоваться нашими услугами текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
      "текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст"
    ],
  },

  // Guide
  {
    classname: classes.guide,
    title: <span className={classes.green}> Как пользоваться чатом? </span>,
    renderSubblock: renderGuideSubblock,

    subblocksData: [
      "Открыть чат по кнопке выше или по кнопке в меню",
      "Описать вашу проблему и, если есть, прикрепить документ с историей болезни (текст пункта приблизительный) чат по кнопке выше или по кнопке в меню",
      "Бот выведет вам всю информацию, которую смог найти в вашем сообщении",
      "Далее вы можете отредактировать ваше сообщение или подтветить информацию, выведенную ботом. При редактировании вам нужно указать, какой конкретно параметр вы хотите изменить, и написать корректное значение",
      "Бот выдаёт результат работы со всеми правками",
    ],
  }
];

export default InfoPage;