export const formatPhonenumber = (phonenumber: string) => {
  const splitArray = phonenumber.split('-');
  const [code, ...restArray] = splitArray;

  return `(${code.split(' ')[1]}) ${restArray.join('-')}`;
};

export const formatAMPM = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
