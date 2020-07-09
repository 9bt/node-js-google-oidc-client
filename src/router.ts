import { Context } from 'Koa';
import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

async function ensureAuthentication(ctx: Context, next: Function) {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/login');
  }

  await next();
};

router.get('/', (ctx: any) => {
  ctx.body = ctx?.session ?? {};
});
router.get('/user', ensureAuthentication, (ctx) => {
  ctx.body = ctx?.session ?? {};
});

router.get('/login', passport.authenticate('oidc'));
router.get('/auth/cb', passport.authenticate('oidc', {
  successRedirect: '/user',
  failureRedirect: '/',
}));
router.get('/logout', ensureAuthentication, async (ctx) => {
  await ctx.logout();
  ctx.session = null;

  ctx.redirect('/');
});

export default router;
