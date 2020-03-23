export default {
  /**
   * 去掉小数点后多余的0
   * @param num
   * @returns {string}
   */
  simpleNum(num){
    num+='';
    if(num.includes('.')){
      while(num.endsWith('0'))
        num = num.substring(0,num.length-2);
      if(num.endsWith('.'))
        num = num.replace('.','');
    }
    return num;
  }
}