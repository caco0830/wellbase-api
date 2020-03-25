const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsers() {
    return [
        {
            id: 1,
            username: 'test-user-1',
            fullname: 'Test user 1',
            password: 'password',
            date_created: new Date('2029-01-22T16:28:32.615Z'),
          },
          {
            id: 2,
            username: 'test-user-2',
            fullname: 'Test user 2',
            password: 'password',
            date_created: new Date('2029-01-22T16:28:32.616Z'),
          },
    ];
}

function seedUsers(db, users){
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }));

    return db.into('users').insert(preppedUsers)
        .then(() => 
            db.raw(
                `SELECT setval('users_id_seq',?)`,
                [users[users.length - 1].id],
            )    
        );
}

function makeAuthHeader(user, secret  = process.env.JWT_SECRET){
    const token = jwt.sign({user_id: user.id}, secret, {
        subject: user.username,
        algorithm: 'HS256'
    });
    return `Bearer ${token}`;
}

function cleanTables(db){
    return db.transaction(trx => 
        trx.raw(
            `TRUNCATE
                users`
        )
        .then(() => 
            Promise.all([
                trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval('users_id_seq', 0)`)
            ])
        )
    ); 
}

function makeUserFixtures() {
    const testUsers = makeUsers();
    
    return {testUsers};
}

module.exports = {
    makeUsers,
    seedUsers,
    makeAuthHeader,
    cleanTables,
    makeUserFixtures
}