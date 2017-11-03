const crypto =require('crypto');
const nodemailer=require('nodemailer');
const SMSClient=require('@alicloud/sms-sdk');

let transporter = nodemailer.createTransport({
  host: 'smtp.126.com',
  port: 25,
  auth: {
    user: 'lmj1804045852@126.com', //发件邮箱
    pass: 'LMJ19960512' //授权码  
  }
}); 
const accessKeyId='LTAIUD13en3y3UtU';
const secretAccessKey ='gCBWfbKPEHvsZdZdy87LBxmUvPyYEv';

let smsClient = new SMSClient({accessKeyId, secretAccessKey});




class Utils{
	constructor(){

	}
	addCrypto (o,field){
		let md5=crypto.createHash('md5');
		md5.update(o[field]);
		o[field]=md5.digest('hex');
	}
	sendMail(mailOptions,fn){
		transporter.sendMail(mailOptions,fn);
	}
	sendSMS(smsOptions,successFn,errorFn){
 return smsClient.sendSMS(smsOptions)
   .then(successFn,errorFn);

	}
}
module.exports = new Utils();