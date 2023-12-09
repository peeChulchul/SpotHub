function formatDateTime(dateTimeString) {

    //dateTimeString에는 new Date() 들어가면 됨
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24시간
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateTimeString));
}

const currentTimestamp = Date.now(); // 현재 시간의 timestamp
const formattedDateTime = formatDateTime(currentTimestamp);
console.log(formattedDateTime);

export default formatDateTime;
