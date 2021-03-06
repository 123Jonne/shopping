const service = require(__basename + '/service/service.js');

const SQL = require(__basename + '/lib/sql/sql.js');

const common = require(__basename + '/common/common.js');

const utils = require(__basename + '/lib/utils/utils.js');

const moment = require('moment');

class RoutesController {
	constructor () {}

	rootController (req, res) {
		res.render('index');
	}

	registerController (req, res) {
		let sql = SQL.findOneForReg(req.body.email);
		service.query(sql)
			.then((result) => {
				if (Array.isArray(result) && result.length === 0) {
					utils.addCrypto(req.body, 'pwd');
					let insertsql = SQL.insertOneForReg(req.body);
					service.query(insertsql)
						.then((result) => {
							res.send(common.register.success);
						})
						.catch((err) => {
							res.send(common.register.error);
						})
				} else {
					res.send(common.register.warning);
				}
			})
			.catch((err) => {
				res.send(common.register.error);
			})
	}

	loginController (req, res) {
		utils.addCrypto(req.body, 'pwd');
		let loginsql = SQL.findOneForLogin(req.body);
		service.query(loginsql)
			.then((result) => {
				if (Array.isArray(result) && result.length === 1) {
					for (var k in common.login.success) {
						result[0][k] = common.login.success[k];
					}
					res.send(result);
				} else {
					res.send([common.login.warning]);
				}
			})
			.catch((err) => {
				res.send([common.login.error]);
			})
	}

	homeController (req, res) {
		let homesql = SQL.findALLForHome();
		service.query(homesql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.json({msg: '查询失败'});
			})
	}

	detailsController (req, res) {
		let detailssql = SQL.findOneForDetails(req.query);
		service.query(detailssql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	commentController (req, res) {
		let commentsql = SQL.findOneForComment(req.query);
		service.query(commentsql)
			.then((result) => {
				result.forEach((v) => {
					v.commentTime = moment(v.commentTime).format('YYYY-MM-DD HH:mm:ss');
				});
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	shopcartController (req, res) {
		let shopcartsql = SQL.findAllForShopcart(req.query);
		service.query(shopcartsql)
			.then((result) => {
				result.forEach((v) => {
					v.cartTime = moment(v.cartTime).format('YYYY-MM-DD HH:mm:ss');
				})
				res.send(result);
			})
			.catch((err) => {
				res.json({'msg': '查询失败'})
			})
	}

	addShopcartController (req, res) {
		let addshopcartsql = SQL.insertOneForShopcart(req.query);
		service.query(addshopcartsql)
			.then((result) => {
				res.json({code: 200});
			})
			.catch((err) => {
				res.send(err);
			})
	}

	settleController (req, res) {
		let settlesql = SQL.findAllForSettle(req.query.id);
		service.query(settlesql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.send(err);
			})
	}

	postSettleController (req, res) {
		let settlesql = SQL.updateOneForShopcart(req.body);
		service.query(settlesql)
			.then((result) => {
				res.json({msg: '结算成功'});
			})
			.catch((err) => {
				res.send(err);
			})
	}

	myController (req, res) {
		let myingsql = SQL.findAllForSettleBuy(req.query);
		service.query(myingsql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.send(err);
			})
	}

	myorderController (req, res) {
		let myordersql = SQL.findAllForSettleOrder(req.query);
		service.query(myordersql)
			.then((result) => {
				result.forEach((v) => {
					v.buyTime = moment(v.buyTime).format('YYYY-MM-DD');
				});
				res.send(result);
			})
			.catch((err) => {
				res.send(err);
			})
	}

	updatecommentController (req, res) {
		let commentsql = SQL.insertOneForComment(req.body);
        console.log("req.body=>",req.body);
		service.query(commentsql)
			.then((result) => {
				console.log('result=>',result);
				res.json({"msg": "评论成功"});
			})
			.catch((err) => {
				res.send(err);
			})
	}

	updateshopcartController (req, res) {
		let shopcartsql = SQL.updateOneForShopcartComment(req.body);
		service.query(shopcartsql)
			.then((result) => {
				res.json({"msg": "评论成功"});
			})
			.catch((err) => {
				res.send(err);
			})
	}

	searchController (req, res) {
		let searchsql = SQL.searchAllForWord(req.query);
		service.query(searchsql)
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.send(err);
			})
	}

	modifypwdController (req, res) {
		let modifypwdsql = SQL.findOneForModifypwd(req.query);
		service.query(modifypwdsql)
			.then((result) => {
				console.log('result=>',result);
				if (result.length === 0) {
					res.json({msg: '用户不存在', code: 0})
				} else {
					//随机生6为验证码
					let time = new Date().getTime().toString();
					let randomCode = time.substr(time.length - 6, 6);
					let mailOptions = {
						from: 'lmj1804045852@126.com',
						to: req.query.email,
						subject: '修改密码',
						text: '验证码',
						html: '<b>您的验证码是: ' + randomCode + '</b>'
					};

					utils.sendMail(mailOptions, function () {
						res.json({msg: '获取验证码成功, 请查收邮件', code: 1, validCode: randomCode});
					})
				}
				
			})
			.catch((err) => {
				res.json({msg: '获取验证码失败'});
			})
	}

	modifynewpwdController (req, res) {
		utils.addCrypto(req.body, 'pwd');
		let modifynewpwdsql = SQL.findOneForModifynewpwd(req.body);
		service.query(modifynewpwdsql)
			.then((result) => {
				res.json({msg: '密码修改成功'});
			})
			.catch((err) => {
				res.send(err);
			})
	}
	sendSMSController (req, res) {
		let time = new Date().getTime().toString();
		let code = time.substr(time.length - 4, 4);
		let smsOptions = {
			PhoneNumbers: req.body.PhoneNumbers, //接收短信手机号
		  SignName: 'Jonne维', //短信签名
		  TemplateCode: 'SMS_109010011', //短信模板代码
		  TemplateParam: '{"code":"' + code + '"}'  //短信验证码
		};

		utils.sendSMS(smsOptions, function (s) {
			console.log('s ==> ', s);
			if (s.Code == 'OK') {
				res.json({msg: '短信发送成功, 请注意查收'});
			}
		}, function (err) {
			res.json({msg: '短信验证码获取失败'});
		})
	}

}

module.exports = new RoutesController();