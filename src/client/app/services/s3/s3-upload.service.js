export default class S3Upload {
    constructor ($q, Base64) {
      'ngInject';
      this._$q = $q;
      this._Base64 = Base64;
      // Us standard region
      AWS.config.region = 'us-west-2';
      AWS.config.update({ accessKeyId: 'AKIAIGD2RZWUFZMLTJYA', secretAccessKey: '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' });
      this.bucket = new AWS.S3({ params: { Bucket: 'g2skit.com', maxRetries: 10 }, httpOptions: { timeout: 360000 } });
      this.progress = 0;
    }

    upload (file) {
      let deferred = this._$q.defer();
      let params = { Bucket: 'g2skit.com', ACL: 'public-read', Key: file.name, ContentType: file.type, Body: file };
      let options = {
          // Part Size of 10mb
          partSize: 10 * 1024 * 1024,
          queueSize: 1
      };
      let uploader = this.bucket.upload(params, options, (err, data) => {
          if (err) {
              deferred.reject(err);
          }
          deferred.resolve();
      });
      uploader.on('httpUploadProgress', (event) => {
          deferred.notify(event);
      });

      return deferred.promise;
    }
}
