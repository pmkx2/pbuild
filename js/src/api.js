//-------------------------------------------------- api beans -----------------------------------------------//  
/** 
 * @apiDefine LoginParam 
 * @apiParam {String} username Your e-mail-address. 
 * @apiParam {String} password Your password. 
 */  
  
/** 
 * @apiDefine UserParam 
 * @apiParam {String} firstname Your firstname. 
 * @apiParam {String} lastname  Your lastname. 
 * @apiParam {Date}   birthday  Your birthday. 
 */  
  
  
  
//-------------------------------------------------- api urls -----------------------------------------------//  
  
//----------------------- register ----------------------- //  
/** 
 * @apiDefine RegisterGroup 
 * 
 * 注册相关接口 
 */  
  
/** 
 * @api {GET} /account/register Register a new user. 
 *   
 * @apiGroup RegisterGroup 
 * @apiName Register 
 * @apiDescription 注册接口 
 * @apiVersion 1.0.0 
 *  
 * @apiUse LoginParam 
 * @apiUse UserParam 
 * @apiParam {Boolean} terms Checkbox to accept the terms. 
 * 
 * @apiSuccessExample Success-Response: 
 *     HTTP/1.1 200 OK 
 *     { 
 *       "result": "success", 
 *       "msg": "", 
 *       userParam: 
 *          { 
 *              username:"用户", 
 *              password:"密码", 
 *          } 
 *     } 
 * 
 * @apiErrorExample Error-Response: 
 *     HTTP/1.1 200 OK 
 *     { 
 *       "result": "fail", 
 *       "msg": "用户名或密码错误" 
 *     } 
 */  
  
//----------------------- login ----------------------- //  
/** 
 * @apiDefine LoginGroup 
 * 
 * 登录相关接口 
 */  
  
//------ login1.1.0版本 ------ //  
 /** 
 * @api {GET} /account/login Signin with an existing user. 
 * 
 * @apiGroup LoginGroup 
 * @apiName login 
 * @apiDescription 登录接口 2 
 * @apiVersion 1.1.0 
 * 
 * @apiParam {LoginParam} LoginParam对象 
 * @apiParam {Boolean} rememberme Checkbox to auto-login on revisit. 
 */  
  
//------ login1.0.0版本 ------ //  
/** 
 * @api {GET} /account/login Signin with an existing user. 
 * 
 * @apiGroup LoginGroup 
 * @apiName login 
 * @apiDescription 登录接口 1 
 * @apiVersion 1.0.0 
 * 
 * @apiParam {LoginParam} LoginParam对象 
 * @apiParam {Boolean} rememberme Checkbox to auto-login on revisit. 
 */  