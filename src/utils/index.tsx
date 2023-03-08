export const formatPhonenumber = (phonenumber: string) => {
  const splitArray = phonenumber.split('-');
  const [code, ...restArray] = splitArray;

  return `(${code.split(' ')[1]}) ${restArray.join('-')}`;
};

export const formatAMPM = (time: string) => {
  let hours = +time.split(':')[0];
  let minutes = time.split(':')[1];
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
