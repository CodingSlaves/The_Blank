'use strict';
const koa = require("koa");
const koa_router = require('koa-router');
const serve = require('koa-static');
const render = require('render.js');
const logger = require('koa-logger');
const app = module.exports = new koa();
const router = module.exports = new koa_router();

let buildings = [];

app.use(serve(__dirname+'/public'));
app.use(render);
app.use(logger());
//handle 404
app.use(async(ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        ctx.status = err.status || 500;
        if (ctx.status === 404) {
            //Your 404.view
            await ctx.render('404',{message:"404 NOT FOUND"});
        } else {
            //other_error view
            await ctx.render('other_error');
        }
    }
});

router.get('/',async ctx=>{
    await ctx.render('index');
}).get('content/:building',async ctx=>{
    const building = ctx.params.building;
    await buildings.map( async (obj)=>{
        if(obj.name === building) await ctx.render('content',building);
    });
}).post('register',async ctx=>{
    let building = ctx.request.body;
    buildings.push(building);
}).put('check',async ctx=>{
    let building = ctx.request.body;
    buildings.map((obj,index)=>{
        if(obj.name === building.name){
            buildings[index] = building;
        }
    });
}).post('emergency',ctx=>{

});

app.listen(3000);

app.use(router.routes());
app.use(router.allowedMethods());
