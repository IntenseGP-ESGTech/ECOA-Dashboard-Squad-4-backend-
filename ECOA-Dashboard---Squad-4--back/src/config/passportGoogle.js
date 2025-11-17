const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, '../../database/cadastro.sqlite');
const db = new sqlite3.Database(dbPath);


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            const name = profile.displayName;

            db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
                if (user) {
                    return done(null, user);
                }

                db.run(
                    "INSERT INTO usuarios (nome, email, provider) VALUES (?, ?, ?)",
                    [name, email, "google"],
                    function (err) {
                        if (err) return done(err);
                        return done(null, {
                            id: this.lastID,
                            nome: name,
                            email: email,
                        });
                    }
                );
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
