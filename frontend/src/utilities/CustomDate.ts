/* eslint-disable require-jsdoc */
/**
 * Date object with some extra methods
 * @extends
 */

interface IMonthWord {
    single : string;
    plural : string;
}
export default class CustomDate extends Date {

  /**
   * Returns name of month in rus language
   * @return name of month
   */
  public getMonthName(): IMonthWord {
    switch (this.getMonth()) {
      case 0:
        return {single: 'Январь', plural: 'Января'};
      case 1:
        return {single: 'Февраль', plural: 'Февраля'};
      case 2:
        return {single: 'Март', plural: 'Марта'};
      case 3:
        return {single: 'Апрель', plural: 'Апреля'};
      case 4:
        return {single: 'Май', plural: 'Мая'};
      case 5:
        return {single: 'Июнь', plural: 'Июня'};
      case 6:
        return {single: 'Июль', plural: 'Июля'};
      case 7:
        return {single: 'Август', plural: 'Августа'};
      case 8:
        return {single: 'Сентябрь', plural: 'Сентября'};
      case 9:
        return {single: 'Октябрь', plural: 'Октября'};
      case 10:
        return {single: 'Ноябрь', plural: 'Ноября'};
      case 11:
        return {single: 'Декабрь', plural: 'Декабря'};
      default:
        return {single: 'Изюбрь', plural: 'Изюбрь'};
    }
  }
  /**
   * Returns name of day of week in russian language
   * @return name of week
   */
  public getDayOfWeekName() : string {
    switch (this.getDay()) {
      case 0:
        return 'Воскресенье';
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      default:
        return 'Неведомая хуйня';
    }
  }

  /**
   * Return month in readable format
   * @return  Double digit number
   * @example  let date = new Date('Thu Jan 21 2020 01:19:11');
   * date.getMonthFormatedString() // '01'
   */
  public getMonthFormatedString() : string {
    const month = this.getMonth() + 1;
    return month < 10 ? `0${month}` : month.toString();
  }


  /**
   * Return month in readable format
   * @return  Double digit number
   * @example  let date = new Date('Thu Jan 21 2020 01:19:11');
   * date.getDateFormatedString() // '01'
   */
  public getDateFormatedString() : string {
    const date = this.getDate()
    return date < 10 ? `0${date}` : date.toString();
  }

   /**
   * Return month in readable format
   * @return  Double digit number
   * @example  let date = new Date('Thu Jan 21 2020 01:19:11');
   * date.getDateFormatedString() // '01'
   */
  public getMinutesFormatedString() : string {
    const min = this.getMinutes()
    return min < 10 ? `0${min}` : min.toString();
  }
}
