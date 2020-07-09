import Koa, { Context } from 'koa';
import passport from 'koa-passport';
import session from 'koa-session';
import { Issuer, Strategy } from 'openid-client';

const RESPONSE_TYPE = 'code';

export async function initiateAuth(app: Koa) {
  const issuer = await Issuer.discover('https://accounts.google.com');

  const client = new issuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uris: [REDIRECT_URI],
    response_types: [RESPONSE_TYPE],
  });

  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    responseType: RESPONSE_TYPE,
    scope: 'openid profile',
  };

  const strategy = new Strategy({ client, params }, (
    tokenset: any,
    user: any,
    done: Function
  ) => {
    done(null, user);
  });

  passport.use('oidc', strategy);
  passport.serializeUser((user: any, done: Function) => {
    done(null, user);
  });
  passport.deserializeUser((user: any, done: Function) => {
    done(null, user);
  });

  const token = process.env.TOKEN;
  if (!token) {
    return;
  }

  app.keys = [token];
  app.use(session({}, app));

  app.use(passport.initialize());
  app.use(passport.session());
};
