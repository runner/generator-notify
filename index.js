/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

const
    util      = require('util'),
    notifier  = require('node-notifier'),
    stripAnsi = require('strip-ansi'),
    logger    = require('runner-logger'),
    name      = 'notify',
    log       = logger.wrap(name),
    loggers   = {
        warn: logger.warn,
        fail: logger.fail
    };


function createLogger ( method, icon ) {
    return function () {
        // default console output
        method.apply(logger, arguments);

        // popup system notification
        notifier.notify({
            title: 'runner',
            icon: icon,
            message: stripAnsi(util.format.apply(util, arguments)).replace(/\t/g, '    ')
        });
    };
}


function start ( config ) {
    if ( config.warn ) {
        logger.warn = createLogger(loggers.warn, 'dialog-warning');
    }

    if ( config.fail ) {
        logger.fail = createLogger(loggers.fail, 'dialog-error');
    }
}


function stop () {
    logger.warn = loggers.warn;
    logger.fail = loggers.fail;
}


function generator ( config = {}, options = {} ) {
    const
        tasks = {},
        {prefix = name + ':', suffix = ''} = options;

    let doneCallback;

    // sanitize and extend defaults
    config = Object.assign({
        warn: false,
        fail: true
    }, config);

    tasks[prefix + 'config' + suffix] = function () {
        log.inspect(config, log);
    };

    tasks[prefix + 'start' + suffix] = function ( done ) {
        start(config);
        doneCallback = done;
    };

    tasks[prefix + 'stop' + suffix] = function () {
        stop();
        // finish start task
        doneCallback && doneCallback();
    };

    return tasks;
}


// export main actions
generator.methods = {
    start: start,
    stop: stop
};


// public
module.exports = generator;
