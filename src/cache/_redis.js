/**
 * @description redis cahce
 * 内存数据库 做缓存
 */

 const {redis} = require("redis");
 const {REDIS_CONF} = require("../conf/db");

 const redisClient = redis.createClient(REDIS_CONF.host, REDIS_CONF.port);

 redisClient.on("error", err => {
     console.log(err);
 });

 /**
  * 
  * @param {string} key 
  * @param {any} val 
  * @param {number} timeout 
  */
 function set(key, val, timeout = 60 * 60) {
    if(typeof val === "object") {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
 }

 /**
  * redis get
  * @param {string} 键
  */
 function get(key) {
     return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err);
                return;
            }
            if(val === null) {
                resolve(null);
            }

            try {
                resolve(JSON.parse(val));
            }catch(e) {
                resolve(val);
            }
            return;
        });
     });
 }

 module.exports = {
    set,
    get
 };