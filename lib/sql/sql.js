class SQL {
	constructor () {}

	findOneForReg (field) {
		return "SELECT `email` FROM `t_user` WHERE `email`='" + field + "'";
	}

	insertOneForReg (o) {
		console.log(o);
		console.log("INSERT INTO `t_user` (`email`,`nickname`,`pwd`,`phone`) VALUES ('" + o.email + "','" + o.nickname + "','" + o.pwd + "','" + o.phone+ "')");
		return "INSERT INTO `t_user` (`email`,`nickname`,`pwd`,`phone`) VALUES ('" + o.email + "','" + o.nickname + "','" + o.pwd + "','" + o.phone+ "')";
	}

	findOneForLogin (o) {
		return "SELECT `uid`,`email`,`nickname` FROM `t_user` WHERE `email`='" + o.email + "' AND `pwd`='" + o.pwd + "'";
	}

	findALLForHome () {
		return "SELECT * FROM `t_product`";
	}

	findOneForDetails (o) {
		return "SELECT * FROM `t_details` WHERE `pid`=" + o.id;
	}

	findOneForComment (o) {
		return "SELECT * FROM `t_comment` WHERE `did`=" + o.id;
	}

	findAllForShopcart (o) {
		return "SELECT * FROM `t_shopcart` WHERE `email`='" + o.email + "'AND `statusCode`=0";
	}
		insertOneForShopcart (o) {
		return "INSERT INTO `t_shopcart`(`pid`,`email`,`nickname`,`count`,`price`,`pname`,`cartTime`,`imgUrl`,`statusCode`) VALUES('"+ o.pid + "','"+ o.email + "','" + o.nickname + "','" + o.count + "','" + o.price + "','" + o.pname + "','" + o.cartTime + "','" + o.imgUrl +"','"+o.statusCode+"')";
	}
	findAllForSettle (id) {
		return "SELECT `s`.`cartid`,`s`.`imgUrl`,`s`.`pname`,`s`.`price`,`s`.`count`, `s`.`nickname`,`g`.`phone`,`g`.`address` FROM `t_shopcart` AS `s`,`t_gain` AS `g` WHERE `s`.`cartid`=" + id;
	}
	updateOneForShopcart(o){
		return "UPDATE `t_shopcart` SET `statusCode`=1,`buyTime`='"+o.buyTime+"' WHERE `email`='" + o.email + "' AND `cartid`=" + o.id;
	}
	findAllForSettleBuy(o){
		return "SELECT count(*) AS `len`  FROM `t_shopcart` WHERE `email`='"+o.email+" 'AND `statusCode`=1";
	}
	findAllForSettleOrder (o) {
		return "SELECT  `cartid`,`pid`,`nickname`,`count`,`price`,`pname`,`cartTime`,`imgUrl`,`buyTime`,`commentstatus` FROM `t_shopcart` WHERE `email`='" + o.email +"' AND `statusCode`=1";
	}
	insertOneForComment (o) {
		return "INSERT INTO `t_comment` (`pname`,`content`,`email`,`nickname`,`commentTime`,`did`) VALUES ('" + o.pname + "','" + o.content + "','" + o.email +"','" + o.nickname + "','" + o.commentTime + "','" + o.did + "')";
		
	}

	updateOneForShopcartComment(o){
		return "UPDATE `t_shopcart` SET `commentstatus`=1 WHERE `cartid`=" + o.cartid + " AND `email`='" + o.email +"' AND `statusCode`=1";
	}

	searchAllForWord(o){
		return "SELECT * FROM `t_product` WHERE `pname` LIKE '%"+o.word+"%'";
	}
	findOneForModifypwd (o) {
		return "SELECT `email` FROM `t_user` WHERE `email`='" + o.email + "'";
	}

	findOneForModifynewpwd (o) {
		return "UPDATE `t_user` SET `pwd`='" + o.pwd + "' WHERE `email`='" + o.email + "'";
	}


}

module.exports = new SQL();