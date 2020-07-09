import Koa, { Context } from 'koa';

import router from '@/router';
import { initiateAuth } from '@/service/authn';

const app = new Koa();

(async () => {
  await initiateAuth(app);
  app.use(router.routes());
})();

app.use(async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = err.statusCode || 500;
    ctx.body = err.message;
  }
});
app.listen(process.env.PORT || 7000);
