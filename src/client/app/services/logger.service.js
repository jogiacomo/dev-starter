class Logger {

  constructor($log, toaster, toastr, toastrConfig) {
    'ngInject';
    this._$log = $log;
    this._toastr = toastr;
    this._toastr.options = toastrConfig;
    this._toaster = toaster;
  }

  error(message, data, title) {
    this._toastr.error(message, title);
    this._$log.error('Error: ' + message, data);
  }

  info(message, data, title) {
    this._toastr.info(message, title);
    this._$log.info('Info: ' + message, data);
  }

  success(message, data, title) {
    this._toastr.success(message, title);
    this._$log.info('Success: ' + message, data);
  }

  warning(message, data, title) {
    this._toastr.warning(message, title);
    this._$log.warn('Warning: ' + message, data);
  }

  debug(message, data, title) {
    this._toastr.info(message, title);
    this._$log.debug(message, data);
  }
}

export default Logger;
