import { checkPassword, getUserDetail } from "../bll/membership.mjs";
import { router } from "../router.mjs";

router.post('/login/password', function handleLogout(ctx) {
    let { username, password } = ctx.body;
    let user = getUserDetail(username);
    if(user && checkPassword(user, password)) {
        ctx.securityManager.setAuthenticationToken(user);
    }
    ctx.session = null;
    ctx.redirect('/');
});

router.get('/logout', function handleLogout(ctx) {
    ctx.session = null;
    ctx.redirect('/');
});