const path = require('path');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const mysql2 = require('mysql2');

const env       = process.env.NODE_ENV || 'dev';
const config    = require(__dirname + '/config/db_config.json')[env];
let sequelize = null;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function() {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: './db/migrations',
        pattern: /\.js$/
    },
    logging: function() {
        console.log.apply(null, arguments);
    }
});

function logUmzugEvent(eventName) {
    return function(name, migration) {
        console.log(`${ name } ${ eventName }`);
    }
}

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated',  logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted',  logUmzugEvent('reverted'));

umzug.pending().then((migrations) => {
    console.log(migrations);

    umzug.execute({
        migrations: migrations.map(function (migration) {
            return migration.file.replace(/\.js$/, '');
        }),
        method: 'up'
    }).then(() => {
        console.log('migrations complete');
    })
})

// umzug.down().then((migrations) => {
//     console.log(migrations);
//     console.log('migrations has been done');
// });