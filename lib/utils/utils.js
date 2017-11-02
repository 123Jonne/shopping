const crypto =require('crypto');
const nodemailer=require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 25,
  auth: {
    user: '841799723@qq.com', //发件邮箱
    pass: 'ktpjbqvefnarbdda' //授权码  
  }
}); 

class Utils{
	constructor(){

	}
	addCrypto (o,field){
		let md5=crypto.createHash('md5');
		md5.update(o[field]);
		o[field]=md5.digest('hex');
	}
}
module.exports = new Utils();